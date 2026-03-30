import { groq } from "./client";

export type TonePreference = "friendly" | "professional" | "firm";

export async function generateReminderEmail(params: {
  clientName: string;
  amountFormatted: string;
  dayNumber: number;
  tonePreference: TonePreference;
  originalEmailBody?: string;
}): Promise<{ subject: string; body: string }> {
  const { clientName, amountFormatted, dayNumber, tonePreference, originalEmailBody } = params;

  const toneInstructions = {
    friendly: "Write in a warm, casual, friendly tone. Use first names. Keep it brief and personable.",
    professional: "Write in a polished, professional tone. Be courteous but businesslike.",
    firm: "Write in a direct, firm tone. Be polite but clear about the expectation of payment.",
  };

  const escalationContext = {
    0: "This is a gentle confirmation that the invoice was received. Very light touch.",
    7: "This is a friendly follow-up, 7 days after the due date. Still casual.",
    14: "This is a clear follow-up, 14 days overdue. More direct but still polite.",
    21: "This is a final notice, 21 days overdue. Firm but professional.",
  };

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a payment reminder email writer. ${toneInstructions[tonePreference]}
${escalationContext[dayNumber as keyof typeof escalationContext] || escalationContext[21]}

${originalEmailBody ? `Here's how the freelancer typically writes (match their style):\n${originalEmailBody.slice(0, 500)}` : ""}

Return JSON with "subject" and "body" fields. Keep emails concise (under 100 words).
Do NOT include the amount in the subject line.`,
      },
      {
        role: "user",
        content: `Write a Day ${dayNumber} payment reminder to ${clientName} for ${amountFormatted}.`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  try {
    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No content");
    return JSON.parse(content);
  } catch {
    return {
      subject: `Quick follow-up on invoice`,
      body: `Hi ${clientName},\n\nJust checking in on the invoice for ${amountFormatted}. Let me know if you have any questions!\n\nThanks`,
    };
  }
}