import { getPendingRemindersForToday, markReminderAsSent } from "./queries";
import { generateReminderEmail } from "@/lib/ai/generate-reminder";
import { sendReminderEmail } from "@/lib/email/send";

export async function processScheduledReminders(): Promise<{
  processed: number;
  sent: number;
  errors: number;
}> {
  const reminders = await getPendingRemindersForToday();
  let sent = 0;
  let errors = 0;

  for (const reminder of reminders) {
    try {
      // Generate personalized reminder if not already generated
      let subject = reminder.subject;
      let body = reminder.body;

      if (!subject || !body) {
        const generated = await generateReminderEmail({
          clientName: reminder.invoice.client_name,
          freelancerName: reminder.profile.display_name || "there",
          amount: reminder.invoice.amount,
          currency: reminder.invoice.currency,
          dueDate: reminder.invoice.due_date,
          reminderNumber: reminder.reminder_number,
          brandVoice: "professional",
        });

        if (!generated) {
          console.error(`Failed to generate reminder ${reminder.id}`);
          errors++;
          continue;
        }

        subject = generated.subject;
        body = generated.body;
      }

      // Send the email
      const result = await sendReminderEmail({
        to: reminder.invoice.client_email,
        subject,
        body,
        replyTo: reminder.profile.email,
      });

      if (result.success && result.messageId) {
        await markReminderAsSent(reminder.id, result.messageId);
        sent++;
      } else {
        console.error(`Failed to send reminder ${reminder.id}:`, result.error);
        errors++;
      }
    } catch (error) {
      console.error(`Error processing reminder ${reminder.id}:`, error);
      errors++;
    }
  }

  return { processed: reminders.length, sent, errors };
}