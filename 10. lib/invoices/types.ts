export type InvoiceStatus = "pending" | "reminded" | "paid" | "overdue";

export interface Invoice {
  id: string;
  userId: string;
  clientName: string;
  clientEmail: string;
  amountCents: number;
  currency: string;
  dueDate: string;
  status: InvoiceStatus;
  paidAt: string | null;
  originalEmailSubject: string | null;
  originalEmailBody: string | null;
  createdAt: string;
}

export type ReminderStatus = "pending" | "approved" | "sent" | "skipped";

export interface Reminder {
  id: string;
  invoiceId: string;
  userId: string;
  dayNumber: number;
  status: ReminderStatus;
  scheduledFor: string;
  subject: string | null;
  body: string | null;
  sentAt: string | null;
  createdAt: string;
}

export type SubscriptionTier = "free" | "starter" | "pro" | "agency";
export type TonePreference = "friendly" | "professional" | "firm";

export interface Profile {
  id: string;
  email: string;
  displayName: string | null;
  subscriptionTier: SubscriptionTier;
  polarCustomerId: string | null;
  polarSubscriptionId: string | null;
  autopilotEnabled: boolean;
  reminderSchedule: number[];
  tonePreference: TonePreference;
  invoicesThisMonth: number;
  createdAt: string;
  updatedAt: string;
}