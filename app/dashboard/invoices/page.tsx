import { createClient } from "@/lib/supabase/server";
import { FileText, Plus } from "lucide-react";

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch user's invoices
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium">Invoices</h1>
            <p className="mt-1 text-[var(--text-secondary)]">
              Manage your invoices and payment reminders.
            </p>
          </div>
        </div>

        {(!invoices || invoices.length === 0) ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: "hsl(var(--accent) / 0.1)" }}>
              <FileText size={28} style={{ color: "hsl(var(--accent))" }} />
            </div>
            <h2 className="font-medium text-lg">No invoices yet</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-sm mx-auto">
              Forward your first invoice to <strong>followup@invoicenudge.com</strong> to get started.
            </p>
            <div className="mt-6 p-4 rounded-lg bg-[var(--bg-secondary)] max-w-md mx-auto">
              <p className="text-sm text-[var(--text-secondary)]">
                <strong>Tip:</strong> Just forward any invoice email — our AI will automatically extract the client name, amount, and due date.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="card card-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.1)" }}>
                      <FileText size={18} style={{ color: "hsl(var(--accent))" }} />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.client_name}</p>
                      <p className="text-sm text-[var(--text-tertiary)]">
                        Due {new Date(invoice.due_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(invoice.amount_cents / 100).toFixed(2)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      invoice.status === "paid" 
                        ? "bg-green-50 text-green-600" 
                        : invoice.status === "overdue"
                        ? "bg-red-50 text-red-600"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}