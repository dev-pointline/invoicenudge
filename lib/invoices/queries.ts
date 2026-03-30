import { createClient } from "@/lib/supabase/server";
import { Invoice, InvoiceWithReminders, Reminder } from "./types";

export async function getInvoicesForUser(userId: string): Promise<Invoice[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
  return data ?? [];
}

export async function getInvoiceWithReminders(
  invoiceId: string,
  userId: string
): Promise<InvoiceWithReminders | null> {
  const supabase = await createClient();

  const [invoiceResult, remindersResult] = await Promise.all([
    supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .eq("user_id", userId)
      .single(),
    supabase
      .from("reminders")
      .select("*")
      .eq("invoice_id", invoiceId)
      .order("reminder_number", { ascending: true }),
  ]);

  if (invoiceResult.error || !invoiceResult.data) {
    return null;
  }

  return {
    ...invoiceResult.data,
    reminders: remindersResult.data ?? [],
  };
}

export async function createInvoice(
  userId: string,
  data: {
    clientName: string;
    clientEmail: string;
    amount: number | null;
    currency: string;
    dueDate: string;
    originalEmailSubject: string;
    originalEmailBody: string;
    parsedBrandVoice: string;
  }
): Promise<Invoice | null> {
  const supabase = await createClient();

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      user_id: userId,
      client_name: data.clientName,
      client_email: data.clientEmail,
      amount: data.amount,
      currency: data.currency,
      due_date: data.dueDate,
      original_email_subject: data.originalEmailSubject,
      original_email_body: data.originalEmailBody,
      parsed_brand_voice: data.parsedBrandVoice,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating invoice:", error);
    return null;
  }

  return invoice;
}

export async function markInvoiceAsPaid(
  invoiceId: string,
  userId: string
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("invoices")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", invoiceId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error marking invoice as paid:", error);
    return false;
  }

  // Skip remaining reminders
  await supabase
    .from("reminders")
    .update({ status: "skipped" })
    .eq("invoice_id", invoiceId)
    .in("status", ["pending", "approved"]);

  return true;
}

export async function getInvoiceStats(userId: string): Promise<{
  totalInvoices: number;
  totalCollected: number;
  averageDaysToPayment: number;
  activeInvoices: number;
}> {
  const supabase = await createClient();

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId);

  if (!invoices || invoices.length === 0) {
    return {
      totalInvoices: 0,
      totalCollected: 0,
      averageDaysToPayment: 0,
      activeInvoices: 0,
    };
  }

  const paidInvoices = invoices.filter((inv) => inv.status === "paid" && inv.paid_at);
  const activeInvoices = invoices.filter((inv) => inv.status === "active");

  let totalDays = 0;
  let paidCount = 0;

  for (const invoice of paidInvoices) {
    const dueDate = new Date(invoice.due_date);
    const paidDate = new Date(invoice.paid_at!);
    const daysDiff = Math.ceil(
      (paidDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    totalDays += daysDiff;
    paidCount++;
  }

  const totalCollected = paidInvoices.reduce(
    (sum, inv) => sum + (inv.amount || 0),
    0
  );

  return {
    totalInvoices: invoices.length,
    totalCollected,
    averageDaysToPayment: paidCount > 0 ? Math.round(totalDays / paidCount) : 0,
    activeInvoices: activeInvoices.length,
  };
}