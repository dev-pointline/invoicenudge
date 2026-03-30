import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { Reminder } from "@/lib/invoices/types";

export async function createRemindersForInvoice(
  invoiceId: string,
  userId: string,
  dueDate: string
): Promise<Reminder[]> {
  const supabase = await createClient();
  const due = new Date(dueDate);

  // Create 4 reminders: Day 0, 7, 14, 21
  const reminders = [0, 7, 14, 21].map((daysAfter, index) => {
    const scheduledDate = new Date(due);
    scheduledDate.setDate(scheduledDate.getDate() + daysAfter);

    return {
      invoice_id: invoiceId,
      user_id: userId,
      reminder_number: index + 1,
      scheduled_date: scheduledDate.toISOString().split("T")[0],
      status: "pending" as const,
    };
  });

  const { data, error } = await supabase
    .from("reminders")
    .insert(reminders)
    .select();

  if (error) {
    console.error("Error creating reminders:", error);
    return [];
  }

  return data ?? [];
}

export async function getPendingRemindersForToday(): Promise<
  Array<Reminder & { invoice: { client_name: string; client_email: string; amount: number | null; currency: string; due_date: string }; profile: { email: string; display_name: string | null; preview_mode: boolean } }>
> {
  const admin = createAdminClient();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await admin
    .from("reminders")
    .select(`
      *,
      invoice:invoices!inner(client_name, client_email, amount, currency, due_date, status),
      profile:profiles!inner(email, display_name, preview_mode)
    `)
    .lte("scheduled_date", today)
    .eq("status", "approved")
    .eq("invoice.status", "active");

  if (error) {
    console.error("Error fetching pending reminders:", error);
    return [];
  }

  return data ?? [];
}

export async function approveReminder(
  reminderId: string,
  userId: string
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reminders")
    .update({ status: "approved" })
    .eq("id", reminderId)
    .eq("user_id", userId)
    .eq("status", "pending");

  if (error) {
    console.error("Error approving reminder:", error);
    return false;
  }

  return true;
}

export async function markReminderAsSent(
  reminderId: string,
  messageId: string
): Promise<boolean> {
  const admin = createAdminClient();

  const { error } = await admin
    .from("reminders")
    .update({
      status: "sent",
      sent_at: new Date().toISOString(),
      resend_message_id: messageId,
    })
    .eq("id", reminderId);

  if (error) {
    console.error("Error marking reminder as sent:", error);
    return false;
  }

  return true;
}