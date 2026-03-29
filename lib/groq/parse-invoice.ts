const PARSE_INVOICE_PROMPT = `
Extract invoice details from this forwarded email. Return JSON only:
{
  "client_email": "email address to send reminders to",
  "client_name": "client's name if found",
  "amount": 1234.56,
  "currency": "USD",
  "due_date": "2026-04-15"
}

If you cannot extract a field, use null. The due_date is critical — look for "due", "payment due", "NET 15", etc.
`;