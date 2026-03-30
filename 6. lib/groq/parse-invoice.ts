import { groq } from "./client";
import { z } from "zod";

const InvoiceDataSchema = z.object({
  clientName: z.string(),
  clientEmail: z.string().email(),
  amountCents: z.number().int().positive(),
  currency: z.string().default("USD"),
  dueDate: z.string(), // ISO date string
});

export type ParsedInvoiceData = z.infer<typeof InvoiceDataSchema>;

export async function parseInvoiceFromEmail(
  emailSubject: string,
  emailBody: string
): Promise<ParsedInvoiceData | null> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an invoice parser. Extract invoice details from emails.
Return JSON with: clientName, clientEmail, amountCents (amount in cents, e.g. $500.00 = 50000), currency, dueDate (ISO format YYYY-MM-DD).
If you cannot find a field, make your best guess from context. The sender email is likely the freelancer, any other email mentioned is the client.
If no due date is specified, assume NET-30 from today.`,
      },
      {
        role: "user",
        content: `Subject: ${emailSubject}\n\nBody:\n${emailBody}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  try {
    const content = completion.choices[0]?.message?.content;
    if (!content) return null;
    const parsed = JSON.parse(content);
    return InvoiceDataSchema.parse(parsed);
  } catch {
    return null;
  }
}