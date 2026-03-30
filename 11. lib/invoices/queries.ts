import { createClient } from "@/lib/supabase/server";
import type { Invoice } from "./types";

export async function getInvoicesForUser(userId: string): Promise<Invoice[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapInvoiceFromDb);
}

export async function getInvoiceById(invoiceId: string, userId: string): Promise<Invoice | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", invoiceId)
    .eq("user_id", userId)
    .single();

  if (error) return null;
  return mapInvoiceFromDb(data);
}

export async function createInvoice(params: {
  userId: string;
  clientName: string;
  clientEmail: string;
  amountCents: number;
  currency: string;
  dueDate: string;
  originalEmailSubject?: string;
  originalEmailBody?: string;
}): Promise<Invoice> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .insert({
      user_id: params.userId,
      client_name: params.clientName,
      client_email: params.clientEmail,
      amount_cents: params.amountCents,
      currency: params.currency,
      due_date: params.dueDate,
      original_email_subject: params.originalEmailSubject,
      original_email_body: params.originalEmailBody,
    })
    .select()
    .single();

  if (error) throw error;
  return mapInvoiceFromDb(data);
}

export async function markInvoicePaid(invoiceId: string, userId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", invoiceId)
    .eq("user_id", userId);

  if (error) throw error;
}

function mapInvoiceFromDb(row: Record<string, unknown>): Invoice {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    clientName: row.client_name as string,
    clientEmail: row.client_email as string,
    amountCents: row.amount_cents as number,
    currency: row.currency as string,
    dueDate: row.due_date as string,
    status: row.status as Invoice["status"],
    paidAt: row.paid_at as string | null,
    originalEmailSubject: row.original_email_subject as string | null,
    originalEmailBody: row.original_email_body as string | null,
    createdAt: row.created_at as string,
  };
}