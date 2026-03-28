import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface ParsedInvoice {
  clientName: string;
  clientEmail: string;
  amountCents: number;
  currency: string;
  dueDate: string;
  invoiceNumber: string | null;
}

export async function parseInvoiceEmail(emailText: string): Promise<ParsedInvoice> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an invoice parser. Extract invoice details from forwarded emails.
Return JSON only, no markdown. Format:
{
  "clientName": "Company or person name",
  "clientEmail": "their@email.com",
  "amountCents": 10000,
  "currency": "USD",
  "dueDate": "2024-02-15",
  "invoiceNumber": "INV-001" or null
}
If you can't find a field, make a reasonable guess or use null.
Amount should be in cents (e.g., $100.00 = 10000).`,
      },
      {
        role: "user",
        content: `Parse this forwarded invoice email:\n\n${emailText}`,
      },
    ],
    temperature: 0.1,
    max_tokens: 500,
  });

  const content = completion.choices[0]?.message?.content || "{}";
  const cleaned = content.replace(/