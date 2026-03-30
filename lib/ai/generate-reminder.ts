import { groq } from "./client";

interface ReminderOptions {
  clientName: string;
  freelancerName: string;
  amount: number | null;
  currency: string;
  dueDate: string;
  reminderNumber: number;
  brandVoice: string;
}

const REMINDER_TONES = {
  1: "friendly reminder on the due date",
  2: "gentle follow-up, 7 days overdue",
  3: "polite but firmer check-in, 14 days overdue",
  4: "final notice, 21 days overdue, maintaining professionalism",
};

export async function generateReminderEmail(
  options: ReminderOptions
): Promise<{ subject: string; body: string } | null> {
  const tone = REMINDER_TONES[options.reminderNumber as keyof typeof REMINDER_TONES];
  const amountStr = options.amount
    ? `${options.currency} ${options.amount.toLocaleString()}`
    : "the invoice amount";

  const prompt = `Write a payment reminder email from a freelancer to their client.

Context:
- Client name: ${options.clientName}
- Freelancer name: ${options.freelancerName}
- Amount due: ${amountStr}
- Due date: ${options.dueDate}
- This is reminder #${options.reminderNumber} (${tone})
- Brand voice: ${options.brandVoice}

Requirements:
- Match the brand voice (${options.brandVoice})
- Be concise (under 100 words for body)
- Include a clear call-to-action
- Never be aggressive or threatening
- Sound human, not robotic

Return JSON with "subject" and "body" fields only.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    if (!parsed.subject || !parsed.body) return null;

    return { subject: parsed.subject, body: parsed.body };
  } catch (error) {
    console.error("Error generating reminder:", error);
    return null;
  }
}