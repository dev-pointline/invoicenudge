import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateReminderEmail } from "@/lib/groq/generate-reminder";
import { sendReminderEmail } from "@/lib/resend/send-reminder";
import { markReminderSent } from "@/lib/reminders/queries";

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const today = new Date().toISOString().split("T")[0];

  // Get all reminders due today that are approved (or pending if autopilot is enabled)
  const { data: reminders, error } = await supabase
    .from("reminders")
    .select(`
      *,
      invoices!inner(*),
      profiles:user_id(*)
    `)
    .eq("scheduled_for", today)
    .in("status", ["approved", "pending"]);

  if (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let sent = 0;
  let skipped = 0;

  for (const reminder of reminders || []) {
    const profile = reminder.profiles;
    const invoice = reminder.invoices;

    // Skip if invoice is already paid
    if (invoice.status === "paid") {
      skipped++;
      continue;
    }

    // If pending and autopilot is disabled, skip (user needs to approve manually)
    if (reminder.status === "pending" && !profile.autopilot_enabled) {
      skipped++;
      continue;
    }

    // Generate reminder email content if not already set
    let subject = reminder.subject;
    let body = reminder.body;

    if (!subject || !body) {
      const generated = await generateReminderEmail({
        clientName: invoice.client_name,
        amountFormatted: formatCurrency(invoice.amount_cents, invoice.currency),
        dayNumber: reminder.day_number,
        tonePreference: profile.tone_preference,
        originalEmailBody: invoice.original_email_body,
      });
      subject = generated.subject;
      body = generated.body;

      // Save generated content
      await supabase
        .from("reminders")
        .update({ subject, body })
        .eq("id", reminder.id);
    }

    // Send the email
    const result = await sendReminderEmail({
      to: invoice.client_email,
      fromName: profile.display_name || "InvoiceNudge",
      fromEmail: "reminders@invoicenudge.com",
      subject,
      body,
      replyTo: profile.email,
    });

    if (result.success) {
      await markReminderSent(reminder.id);
      sent++;
    } else {
      console.error("Failed to send reminder:", result.error);
    }
  }

  return NextResponse.json({ sent, skipped, total: reminders?.length || 0 });
}

function formatCurrency(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}