import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getInvoicesForUser } from "@/lib/invoices/queries";
import { InvoiceCard } from "@/components/InvoiceCard";
import { FileText } from "lucide-react";

export default async function InvoicesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const invoices = await getInvoicesForUser(user.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <p className="text-gray-600">
          All your invoices and their reminder status
        </p>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No invoices yet
          </h3>
          <p className="text-gray-600 mb-4">
            Forward your first invoice to start tracking payments
          </p>
          <code className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-mono text-gray-700">
            followup+{user.id}@invoicenudge.com
          </code>
        </div>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  );
}