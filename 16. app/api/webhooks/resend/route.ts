import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseInvoiceFromEmail } from "@/lib/groq/parse-invoice";
import { createRemindersForInvoice } from "@/lib/reminders/queries";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Extract email data from Resend inbound webhook
    const { from, subject, text, to } = payload;
    
    // Find user by their forwarding email (the "to" address should be followup@invoicenudge.com)
    // The "from" address is the user's email
    const supabase = createAdminClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", from)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse invoice using Groq AI
    const invoiceData = await parseInvoiceFromEmail(subject || "", text || "");
    
    if (!invoiceData) {
      return NextResponse.json({ error: "Could not parse invoice" }, { status: 400 });
    }

    // Create invoice record
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .insert({
        user_id: profile.id,
        client_name: invoiceData.clientName,
        client_email: invoiceData.clientEmail,
        amount_cents: invoiceData.amountCents,
        currency: invoiceData.currency,
        due_date: invoiceData.dueDate,
        original_email_subject: subject,
        original_email_body: text,
      })
      .select()
      .single();

    if (invoiceError) {
      return NextResponse.json({ error: invoiceError.message }, { status: 500 });
    }

    // Create reminder schedule
    const schedule = profile.reminder_schedule || [0, 7, 14, 21];
    await createRemindersForInvoice({
      invoiceId: invoice.id,
      userId: profile.id,
      dueDate: invoiceData.dueDate,
      schedule,
    });

    // Increment invoices_this_month counter
    await supabase
      .from("profiles")
      .update({ invoices_this_month: (profile.invoices_this_month || 0) + 1 })
      .eq("id", profile.id);

    return NextResponse.json({ success: true, invoiceId: invoice.id });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}