import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { getInvoiceWithReminders } from "@/lib/invoices/queries";
import { InvoiceStatusBadge } from "@/components/InvoiceStatusBadge";
import { ReminderTimeline } from "@/components/ReminderTimeline";
import { ReminderPreviewCard } from "@/components/ReminderPreviewCard";
import { MarkPaidButton } from "./mark-paid-button";
import { format } from "date-fns";
import { ArrowLeft, DollarSign, Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const invoice = await getInvoiceWithReminders(id, user.id);

  if (!invoice) {
    notFound();
  }

  const pendingReminders = invoice.reminders.filter((r) => r.status === "pending");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/invoices"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to invoices
      </Link>

      <div className="bg-white rounded-xl border p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {invoice.client_name}
            </h1>
            <p className="text-gray-600">{invoice.client_email}</p>
          </div>
          <InvoiceStatusBadge status={invoice.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-semibold">
                {invoice.amount
                  ? `${invoice.currency} ${invoice.amount.toLocaleString()}`
                  : "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="font-semibold">
                {format(new Date(invoice.due_date), "MMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Brand Voice</p>
              <p className="font-semibold capitalize">
                {invoice.parsed_brand_voice ?? "Professional"}
              </p>
            </div>
          </div>
        </div>

        {invoice.status === "active" && (
          <div className="mt-6 pt-6 border-t">
            <MarkPaidButton invoiceId={invoice.id} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Reminder Timeline
          </h2>
          <ReminderTimeline reminders={invoice.reminders} />
        </div>

        {pendingReminders.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pending Approval
            </h2>
            <div className="space-y-4">
              {pendingReminders.map((reminder) => (
                <ReminderPreviewCard
                  key={reminder.id}
                  reminder={reminder}
                  clientName={invoice.client_name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}