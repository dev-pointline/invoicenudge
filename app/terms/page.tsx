import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link href="/" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
        &larr; Back to home
      </Link>
      <h1 className="mt-8 text-3xl font-medium tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-[var(--text-tertiary)]">Last updated: March 29, 2026</p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Service Description</h2>
          <p>
            InvoiceNudge is currently in pre-launch. By joining the waitlist, you are expressing interest in being 
            notified when the service becomes available. No payment is required or processed at this stage.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Waitlist</h2>
          <p>
            Joining the waitlist does not guarantee access to the product, specific pricing, or features described 
            on the landing page. Planned pricing and features are subject to change before launch. Founding member 
            pricing ($19/month forever) applies only to early subscribers who sign up during the pre-launch period 
            and remains valid as long as the subscription remains active.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Intellectual Property</h2>
          <p>
            All content on this website, including text, design, graphics, and code, is the property of InvoiceNudge 
            and its creators. You may not copy, reproduce, modify, or distribute any content without prior written 
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Limitation of Liability</h2>
          <p>
            This website is provided &quot;as is&quot; without warranties of any kind, express or implied. We are not 
            liable for any damages arising from your use of this website or reliance on information provided here. 
            Claims regarding the product&apos;s capabilities (such as time saved or payment speed improvements) are 
            based on planned features and general industry research, not measured results from this specific product.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Changes to Terms</h2>
          <p>
            We may update these terms at any time. When we do, we will update the &quot;Last updated&quot; date at the 
            top of this page. Continued use of the website after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Contact</h2>
          <p>
            Questions about these terms? Email us at legal@invoicenudge.com.
          </p>
        </section>
      </div>
    </main>
  );
}