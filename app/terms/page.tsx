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
        Last updated: March 30, 2026
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
            stage. The service described on this website represents our planned
            product and may change before launch.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Waitlist
          </h2>
          <p>
            Joining the waitlist does not guarantee access to the product,
            specific pricing, or features described on the landing page. Planned
            pricing and features are subject to change before launch. Waitlist
            members will be notified of launch details via email.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Future Service Terms
          </h2>
          <p>
            When InvoiceNudge launches, users will be required to agree to a
            complete Terms of Service that covers the actual product. These
            terms will include details about subscription payments, service
            limitations, data usage, and liability limitations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Intellectual Property
          </h2>
          <p>
            All content on this website, including text, design, logos, and
            code, is the property of InvoiceNudge and its creators. You may not
            copy, reproduce, or distribute any content without prior written
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Limitation of Liability
          </h2>
          <p>
            This website is provided &quot;as is&quot; without warranties of any
            kind, express or implied. We are not liable for any damages arising
            from your use of this website or reliance on information provided
            here. The planned features and pricing are subject to change without
            notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Governing Law
          </h2>
          <p>
            These terms shall be governed by and construed in accordance with
            the laws of the State of Delaware, United States, without regard to
            its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">
            Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be posted on this page with an updated &quot;Last updated&quot;
            date. Your continued use of the website after changes are posted
            constitutes acceptance of the modified terms.
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