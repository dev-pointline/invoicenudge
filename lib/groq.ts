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
        content: "You are an invoice parser. Extract invoice details from forwarded emails. Return JSON only. Format: { clientName, clientEmail, amountCents (in cents), currency, dueDate (YYYY-MM-DD), invoiceNumber (or null) }",
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
  try {
    const cleaned = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned) as ParsedInvoice;
  } catch {
    return {
      clientName: "Unknown",
      clientEmail: "",
      amountCents: 0,
      currency: "USD",
      dueDate: new Date().toISOString().slice(0, 10),
      invoiceNumber: null,
    };
  }
}
