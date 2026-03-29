import { createClient } from "@/lib/supabase/server";
import { FileText, Clock, DollarSign, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // For now, show placeholder stats since we don't have real invoice data yet
  const stats = {
    totalInvoices: 0,
    pendingReminders: 0,
    totalCollected: 0,
    avgDaysToPayment: 0,
  };

  return (
    <div className="p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-medium">Welcome back</h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Here&apos;s an overview of your payment reminders.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.1)" }}>
                <FileText size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.totalInvoices}</p>
                <p className="text-xs text-[var(--text-tertiary)]">Total Invoices</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.1)" }}>
                <Clock size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.pendingReminders}</p>
                <p className="text-xs text-[var(--text-tertiary)]">Pending Reminders</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.1)" }}>
                <DollarSign size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <div>
                <p className="text-2xl font-medium">${stats.totalCollected}</p>
                <p className="text-xs text-[var(--text-tertiary)]">Collected</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.1)" }}>
                <TrendingUp size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.avgDaysToPayment}</p>
                <p className="text-xs text-[var(--text-tertiary)]">Avg. Days to Pay</p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="card">
          <h2 className="font-medium mb-4">Get started</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--bg-secondary)]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0" style={{ background: "hsl(var(--accent))", color: "white" }}>
                1
              </div>
              <div>
                <h3 className="font-medium text-sm">Forward your first invoice</h3>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Send any invoice email to <strong>followup@invoicenudge.com</strong>. Our AI will parse it automatically.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--bg-secondary)]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 bg-[var(--border)] text-[var(--text-tertiary)]">
                2
              </div>
              <div>
                <h3 className="font-medium text-sm text-[var(--text-tertiary)]">Review AI-drafted reminders</h3>
                <p className="mt-1 text-sm text-[var(--text-tertiary)]">
                  Preview each reminder before it sends. Edit if needed, or approve with one click.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--bg-secondary)]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 bg-[var(--border)] text-[var(--text-tertiary)]">
                3
              </div>
              <div>
                <h3 className="font-medium text-sm text-[var(--text-tertiary)]">Get paid faster</h3>
                <p className="mt-1 text-sm text-[var(--text-tertiary)]">
                  Reminders go out automatically on Day 0, 7, 14, and 21. You focus on your work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}