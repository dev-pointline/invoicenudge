import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link
        href="/"
        className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
      >
        &larr; Back to home
      </Link>
      <h1 className="mt-8 text-3xl font-medium tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-[var(--text-tertiary)]">
        Last updated: March 29, 2026
      </p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Service Description
          </h2>
          <p>
            InvoiceNudge is currently in pre-launch. By joining the waitlist,
            you are expressing interest in being notified when the service
            becomes available. No payment is required or processed at this
            stage.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Waitlist
          </h2>
          <p>
            Joining the waitlist does not guarantee access to the product,
            pricing, or features described on the landing page. Planned pricing
            (Starter $19/mo, Pro $49/mo, Agency $149/mo) and features are
            subject to change before launch. Founding member pricing will be
            honored for the first 500 waitlist members who convert to paid
            customers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Acceptable Use
          </h2>
          <p>
            When InvoiceNudge launches, you agree to use the service only for
            legitimate business purposes (sending payment reminders for real
            invoices). You will not use the service to send spam, phishing
            attempts, or harassing communications. Violation of this policy
            will result in immediate account termination.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Intellectual Property
          </h2>
          <p>
            All content on this website, including text, design, code, and the
            InvoiceNudge name and logo, is the property of InvoiceNudge and its
            creators. You may not copy, reproduce, or distribute any content
            without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Limitation of Liability
          </h2>
          <p>
            This website and waitlist are provided &quot;as is&quot; without
            warranties of any kind. We are not liable for any damages arising
            from your use of this website or reliance on information provided
            here. When the product launches, a complete Terms of Service with
            full liability provisions will be provided.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Money-Back Guarantee
          </h2>
          <p>
            InvoiceNudge offers a 60-day money-back guarantee on all paid
            subscriptions. If you&apos;re not satisfied for any reason, email
            support@invoicenudge.com for a full refund of subscription fees
            paid. This guarantee applies only to subscription fees, not to any
            payments collected from your clients using the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Contact
          </h2>
          <p>
            Questions about these terms? Email us at legal@invoicenudge.com.
          </p>
        </section>
      </div>
    </main>
  );
}