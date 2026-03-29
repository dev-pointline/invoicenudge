import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link 
        href="/" 
        className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
      >
        &larr; Back to home
      </Link>
      <h1 className="mt-8 text-3xl font-medium tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-[var(--text-tertiary)]">Last updated: March 29, 2026</p>

      <div className="mt-12 space-y-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">What We Collect</h2>
          <p>
            When you join our waitlist, we collect your email address. That&apos;s it. 
            We don&apos;t use tracking cookies, analytics scripts, or third-party data 
            collection tools on this pre-launch page.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">How We Use Your Data</h2>
          <p>
            Your email address is used solely to notify you when InvoiceNudge launches 
            and to send occasional product updates (no more than 1-2 emails per month). 
            We will never sell, share, or rent your email address to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Data Storage</h2>
          <p>
            Your email is stored securely on our servers using industry-standard encryption. 
            We use Supabase for database storage and follow security best practices including 
            row-level security and encrypted connections.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Your Rights</h2>
          <p>
            You can request deletion of your data at any time by emailing us at 
            privacy@invoicenudge.com. We will remove your information within 30 days 
            of your request. You can also unsubscribe from emails using the link in 
            any email we send.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Future Product Data</h2>
          <p>
            When InvoiceNudge launches, we will update this privacy policy to reflect 
            how we handle invoice data, email content, and payment information. We are 
            committed to minimal data collection and will only store what&apos;s necessary 
            to provide the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Contact</h2>
          <p>
            Questions about this policy? Email us at privacy@invoicenudge.com.
          </p>
        </section>
      </div>
    </main>
  );
}