import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Reminder } from "@/lib/invoices/types";

export async function getRemindersForInvoice(invoiceId: string, userId: string): Promise<Reminder[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("invoice_id", invoiceId)
    .eq("user_id", userId)
    .order("day_number", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapReminderFromDb);
}

export async function getPendingRemindersForUser(userId: string): Promise<Reminder[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "pending")
    .order("scheduled_for", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapReminderFromDb);
}

export async function createRemindersForInvoice(params: {
  invoiceId: string;
  userId: string;
  dueDate: string;
  schedule: number[];
}): Promise<void> {
  const supabase = createAdminClient();
  const dueDateTime = new Date(params.dueDate);

  const reminders = params.schedule.map((dayNumber) => {
    const scheduledFor = new Date(dueDateTime);
    scheduledFor.setDate(scheduledFor.getDate() + dayNumber);

    return {
      invoice_id: params.invoiceId,
      user_id: params.userId,
      day_number: dayNumber,
      status: "pending",
      scheduled_for: scheduledFor.toISOString().split("T")[0],
    };
  });

  const { error } = await supabase.from("reminders").insert(reminders);
  if (error) throw error;
}

export async function approveReminder(reminderId: string, userId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("reminders")
    .update({ status: "approved" })
    .eq("id", reminderId)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function markReminderSent(reminderId: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("reminders")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", reminderId);

  if (error) throw error;
}

export async function skipRemainingReminders(invoiceId: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("reminders")
    .update({ status: "skipped" })
    .eq("invoice_id", invoiceId)
    .in("status", ["pending", "approved"]);

  if (error) throw error;
}

function mapReminderFromDb(row: Record<string, unknown>): Reminder {
  return {
    id: row.id as string,
    invoiceId: row.invoice_id as string,
    userId: row.user_id as string,
    dayNumber: row.day_number as number,
    status: row.status as Reminder["status"],
    scheduledFor: row.scheduled_for as string,
    subject: row.subject as string | null,
    body: row.body as string | null,
    sentAt: row.sent_at as string | null,
    createdAt: row.created_at as string,
  };
}