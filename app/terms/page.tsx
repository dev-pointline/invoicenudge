import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
      >
        <ArrowLeft size={14} />
        Back to home
      </Link>
      <h1 className="mt-8 text-3xl font-medium tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-[var(--text-tertiary)]">Last updated: March 30, 2026</p>

      <div className="mt-12 space-y-8 text-sm leading-relaxed text-[var(--text-secondary)]">
        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Service Description</h2>
          <p>
            InvoiceNudge is an automated payment reminder service for freelancers. The service is currently in 
            pre-launch with a planned launch date of April 15, 2026. By joining the waitlist, you are expressing 
            interest in being notified when the service becomes available.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Waitlist Terms</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Joining the waitlist does not guarantee access to the product or any specific pricing.</li>
            <li>Planned pricing and features described on this website are subject to change before launch.</li>
            <li>&quot;Founding member pricing&quot; refers to early access pricing available to the first 500 waitlist members who convert to paid subscribers at launch.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Acceptable Use</h2>
          <p>When InvoiceNudge launches, you agree to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Only send payment reminders for legitimate invoices you have issued</li>
            <li>Not use the service to harass, spam, or send abusive communications</li>
            <li>Comply with all applicable laws regarding debt collection and communications</li>
            <li>Provide accurate information when setting up your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Intellectual Property</h2>
          <p>
            All content on this website, including text, design, logos, and code, is the property of InvoiceNudge 
            and its creators. You may not copy, reproduce, or distribute any content without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Limitation of Liability</h2>
          <p>
            This website and waitlist service are provided &quot;as is&quot; without warranties of any kind. We are not 
            liable for any damages arising from your use of this website or reliance on information provided here.
          </p>
          <p className="mt-3">
            When InvoiceNudge launches, our liability will be limited to the amount you have paid for the service 
            in the preceding 12 months. We are not responsible for any client relationships affected by automated 
            reminders you authorize through the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Refund Policy</h2>
          <p>
            InvoiceNudge offers a 60-day money-back guarantee. If you are not satisfied with the service for any 
            reason within 60 days of your first payment, contact us at hello@pointline.dev for a full refund.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Changes to Terms</h2>
          <p>
            We may update these terms at any time. Material changes will be communicated via email to waitlist 
            members and active subscribers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-[var(--text-primary)] mb-3">Contact</h2>
          <p>
            Questions about these terms? Email us at{" "}
            <a href="mailto:hello@pointline.dev" className="underline hover:text-[var(--text-primary)]">
              hello@pointline.dev
            </a>.
          </p>
        </section>
      </div>
    </main>
  );
}