import Link from "next/link";
import { Check, Send, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--bg-secondary)]">
      <div className="w-full max-w-md text-center">
        <div className="card">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6" style={{ background: "hsl(var(--accent) / 0.1)" }}>
            <Check size={32} style={{ color: "hsl(var(--accent))" }} />
          </div>
          <h1 className="text-2xl font-medium">You&apos;re all set!</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            Thanks for upgrading. Your account has been activated with your new plan.
          </p>
          <div className="mt-8 space-y-3">
            <Link
              href="/dashboard"
              className="btn-primary w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/"
              className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}