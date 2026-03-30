import { z } from "zod";

const InboundEmailSchema = z.object({
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  text: z.string().optional(),
  html: z.string().optional(),
});

export type InboundEmail = z.infer<typeof InboundEmailSchema>;

export function parseInboundWebhook(payload: unknown): InboundEmail | null {
  const result = InboundEmailSchema.safeParse(payload);
  if (!result.success) {
    console.error("Invalid inbound email payload:", result.error);
    return null;
  }
  return result.data;
}

export function extractUserIdFromToAddress(toAddress: string): string | null {
  // Format: followup+{userId}@invoicenudge.com
  const match = toAddress.match(/followup\+([a-f0-9-]+)@/i);
  return match ? match[1] : null;
}

export function extractEmailContent(email: InboundEmail): string {
  // Prefer text content over HTML
  if (email.text) {
    return email.text;
  }
  if (email.html) {
    // Strip HTML tags for basic text extraction
    return email.html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  return "";
}