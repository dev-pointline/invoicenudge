import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
      >
        <ArrowLeft size={14} />
        Back to home
      </Link>
      <h1 className="mt-8 text-3xl font-medium tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[var(--text-tertiary)]">Last updated: March 30, 2026</p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">What We Collect</h2>
          <p>
            When you join our waitlist, we collect your email address. That&apos;s it. We don&apos;t use tracking cookies, 
            analytics scripts, or third-party data collection tools on this landing page.
          </p>
          <p className="mt-3">
            When InvoiceNudge launches (April 15, 2026), we will also process invoice data you forward to us, including 
            client email addresses, invoice amounts, and due dates. This data is used solely to send payment reminders 
            on your behalf.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your email address is used to notify you when InvoiceNudge launches and to send occasional product updates.</li>
            <li>Invoice data is used exclusively to send automated payment reminders to your clients.</li>
            <li>We will never sell, share, or rent your data to third parties for marketing purposes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Data Storage & Security</h2>
          <p>
            Your data is stored securely using industry-standard encryption. We use Supabase for database storage 
            (with row-level security enabled) and Resend for email delivery (SPF/DKIM/DMARC configured).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Data Retention</h2>
          <p>
            Waitlist emails are retained until you unsubscribe or request deletion. Invoice data is retained for 
            the duration of your subscription plus 30 days after cancellation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Your Rights</h2>
          <p>
            You can request deletion of your data at any time by emailing hello@pointline.dev. We will remove 
            your information within 30 days of your request. You can also unsubscribe from marketing emails at any time.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:hello@pointline.dev" className="underline hover:text-[var(--text-primary)]">
              hello@pointline.dev
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}