import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getInvoicesForUser, getInvoiceStats } from "@/lib/invoices/queries";
import { getSubscriptionForUser } from "@/lib/subscriptions/queries";
import { OnboardingPrompt } from "@/components/OnboardingPrompt";
import { PaymentMetrics } from "@/components/PaymentMetrics";
import { InvoiceCard } from "@/components/InvoiceCard";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [invoices, stats, subscription] = await Promise.all([
    getInvoicesForUser(user.id),
    getInvoiceStats(user.id),
    getSubscriptionForUser(user.id),
  ]);

  const recentInvoices = invoices.slice(0, 5);
  const forwardEmail = `followup+${user.id}@invoicenudge.com`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Track your invoices and payment reminders
          </p>
        </div>
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
        >
          <FileText className="h-4 w-4" />
          View All Invoices
        </Link>
      </div>

      {invoices.length === 0 ? (
        <OnboardingPrompt forwardEmail={forwardEmail} />
      ) : (
        <>
          <PaymentMetrics stats={stats} tier={subscription?.tier ?? "free"} />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Invoices
              </h2>
              <Link
                href="/invoices"
                className="text-primary-600 hover:underline text-sm font-medium"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
              ))}
            </div>
          </div>

          <div className="mt-8 bg-primary-50 rounded-xl p-6 border border-primary-100">
            <h3 className="font-semibold text-gray-900 mb-2">
              Forward new invoices
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Send invoices to this address and we&apos;ll handle the follow-ups:
            </p>
            <code className="bg-white px-4 py-2 rounded-lg border text-sm font-mono text-primary-700 block">
              {forwardEmail}
            </code>
          </div>
        </>
      )}
    </div>
  );
}