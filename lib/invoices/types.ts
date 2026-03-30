export interface Invoice {
  id: string;
  user_id: string;
  client_name: string;
  client_email: string;
  amount: number | null;
  currency: string;
  due_date: string;
  original_email_subject: string | null;
  original_email_body: string | null;
  parsed_brand_voice: string | null;
  status: "active" | "paid" | "canceled";
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InvoiceParsed {
  clientName: string;
  clientEmail: string;
  amount: number | null;
  currency: string;
  dueDate: string;
  brandVoice: string;
}

export interface Reminder {
  id: string;
  invoice_id: string;
  user_id: string;
  reminder_number: number;
  scheduled_date: string;
  subject: string | null;
  body: string | null;
  status: "pending" | "approved" | "sent" | "skipped";
  sent_at: string | null;
  resend_message_id: string | null;
  created_at: string;
}

export interface InvoiceWithReminders extends Invoice {
  reminders: Reminder[];
}

export interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  preview_mode: boolean;
  brand_voice: string;
  forward_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  polar_subscription_id: string | null;
  polar_customer_id: string | null;
  tier: "free" | "starter" | "pro" | "agency";
  status: "active" | "canceled" | "past_due";
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
}