import { groq } from "./client";
import { InvoiceParsed } from "@/lib/invoices/types";
import { z } from "zod";

const InvoiceSchema = z.object({
  clientName: z.string(),
  clientEmail: z.string().email(),
  amount: z.number().nullable(),
  currency: z.string().default("USD"),
  dueDate: z.string(),
  brandVoice: z.enum(["casual", "friendly", "professional", "formal"]),
});

export async function parseInvoiceFromEmail(
  emailSubject: string,
  emailBody: string
): Promise<InvoiceParsed | null> {
  const prompt = `Extract the following from this forwarded invoice email:
- clientName: The name of the client/company being invoiced
- clientEmail: The client's email address
- amount: The total amount due (number only, null if not found)
- currency: The currency code (USD, EUR, etc.)
- dueDate: The payment due date in YYYY-MM-DD format
- brandVoice: Describe the sender's communication style (casual/friendly/professional/formal)

Return JSON only, no explanation.

Subject: ${emailSubject}

Body:
${emailBody}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return null;

    const parsed = JSON.parse(content);
    const validated = InvoiceSchema.safeParse(parsed);

    if (!validated.success) {
      console.error("Invoice parsing validation failed:", validated.error);
      return null;
    }

    return validated.data;
  } catch (error) {
    console.error("Error parsing invoice:", error);
    return null;
  }
}