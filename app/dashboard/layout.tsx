import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Send, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react";

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-[var(--border)] hidden md:block">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[var(--border)]">
            <Link href="/dashboard" className="flex items-center gap-2 text-lg font-medium">
              <Send size={20} style={{ color: "hsl(var(--accent))" }} />
              InvoiceNudge
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <LayoutDashboard size={18} />
              Overview
            </Link>
            <Link
              href="/dashboard/invoices"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FileText size={18} />
              Invoices
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>

          <div className="p-4 border-t border-[var(--border)]">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-[var(--text-tertiary)]">Free plan</p>
            </div>
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <LogOut size={18} />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-medium">
            <Send size={18} style={{ color: "hsl(var(--accent))" }} />
            InvoiceNudge
          </Link>
          <Link href="/dashboard/settings" className="p-2">
            <Settings size={20} />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="md:ml-64 min-h-screen">
        {children}
      </main>

      {/* Mobile nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] px-6 py-3">
        <div className="flex items-center justify-around">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[var(--text-secondary)]">
            <LayoutDashboard size={20} />
            <span className="text-xs">Overview</span>
          </Link>
          <Link href="/dashboard/invoices" className="flex flex-col items-center gap-1 text-[var(--text-secondary)]">
            <FileText size={20} />
            <span className="text-xs">Invoices</span>
          </Link>
          <Link href="/dashboard/settings" className="flex flex-col items-center gap-1 text-[var(--text-secondary)]">
            <Settings size={20} />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}