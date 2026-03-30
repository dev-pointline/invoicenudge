import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  parseInboundWebhook,
  extractUserIdFromToAddress,
  extractEmailContent,
} from "@/lib/email/parse-inbound";
import { parseInvoiceFromEmail } from "@/lib/ai/parse-invoice";
import { createRemindersForInvoice } from "@/lib/reminders/queries";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const email = parseInboundWebhook(payload);

    if (!email) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Extract user ID from the "to" address
    const userId = extractUserIdFromToAddress(email.to);
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid recipient address" },
        { status: 400 }
      );
    }

    // Verify user exists
    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("profiles")
      .select("id, preview_mode")
      .eq("id", userId)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse invoice content with AI
    const emailContent = extractEmailContent(email);
    const parsed = await parseInvoiceFromEmail(email.subject, emailContent);

    if (!parsed) {
      return NextResponse.json(
        { error: "Failed to parse invoice" },
        { status: 422 }
      );
    }

    // Create invoice
    const { data: invoice, error: invoiceError } = await admin
      .from("invoices")
      .insert({
        user_id: userId,
        client_name: parsed.clientName,
        client_email: parsed.clientEmail,
        amount: parsed.amount,
        currency: parsed.currency,
        due_date: parsed.dueDate,
        original_email_subject: email.subject,
        original_email_body: emailContent,
        parsed_brand_voice: parsed.brandVoice,
      })
      .select()
      .single();

    if (invoiceError || !invoice) {
      console.error("Error creating invoice:", invoiceError);
      return NextResponse.json(
        { error: "Failed to create invoice" },
        { status: 500 }
      );
    }

    // Create reminders (status depends on preview_mode)
    const initialStatus = profile.preview_mode ? "pending" : "approved";
    const reminders = [0, 7, 14, 21].map((daysAfter, index) => {
      const scheduledDate = new Date(parsed.dueDate);
      scheduledDate.setDate(scheduledDate.getDate() + daysAfter);
      return {
        invoice_id: invoice.id,
        user_id: userId,
        reminder_number: index + 1,
        scheduled_date: scheduledDate.toISOString().split("T")[0],
        status: initialStatus,
      };
    });

    await admin.from("reminders").insert(reminders);

    return NextResponse.json({ success: true, invoiceId: invoice.id });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}