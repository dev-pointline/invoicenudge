import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — InvoiceNudge",
  description: "How InvoiceNudge collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-3xl font-medium mb-8">Privacy Policy</h1>

        <div className="prose prose-stone max-w-none space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <p>
            <strong className="text-[var(--text-primary)]">Last updated:</strong> March 2026
          </p>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              What We Collect
            </h2>
            <p>
              InvoiceNudge is currently in pre-launch. At this stage, we only collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong className="text-[var(--text-primary)]">Email address:</strong> When you join our waitlist, we collect your email address to notify you when we launch.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Name (optional):</strong> If you provide your name, we use it to personalize communications.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              How We Use Your Data
            </h2>
            <p>We use your email address solely to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Send you launch updates and early access invitations</li>
              <li>Notify you about important product announcements</li>
              <li>Respond to questions or feedback you send us</li>
            </ul>
            <p className="mt-4">
              We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Data Storage & Security
            </h2>
            <p>
              Your data is stored securely using industry-standard encryption. We use trusted 
              third-party services (email delivery, hosting) that comply with data protection regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Request access to the data we hold about you</li>
              <li>Request deletion of your data at any time</li>
              <li>Unsubscribe from our emails using the link in any email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Future Data Collection
            </h2>
            <p>
              When InvoiceNudge launches, we will update this policy to reflect additional data 
              collection necessary for the service (such as invoice details and client information). 
              We will notify all waitlist members before any changes take effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Contact Us
            </h2>
            <p>
              Questions about your privacy? Email us at{" "}
              <a
                href="mailto:privacy@invoicenudge.com"
                className="text-[var(--accent)] hover:underline"
              >
                privacy@invoicenudge.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}