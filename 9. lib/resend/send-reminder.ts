import { resend } from "./client";

export async function sendReminderEmail(params: {
  to: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  body: string;
  replyTo: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: `${params.fromName} <${params.fromEmail}>`,
      to: params.to,
      subject: params.subject,
      text: params.body,
      replyTo: params.replyTo,
    });

    if (error) return { success: false, error: error.message };
    return { success: true, messageId: data?.id };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}