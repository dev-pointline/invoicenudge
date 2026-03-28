import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service — InvoiceNudge",
  description: "Terms and conditions for using InvoiceNudge.",
};

export default function TermsPage() {
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

        <h1 className="text-3xl font-medium mb-8">Terms of Service</h1>

        <div className="prose prose-stone max-w-none space-y-8 text-[var(--text-secondary)] leading-relaxed">
          <p>
            <strong className="text-[var(--text-primary)]">Last updated:</strong> March 2026
          </p>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Service Description
            </h2>
            <p>
              InvoiceNudge is an AI-powered payment reminder service currently in pre-launch development. 
              By joining our waitlist, you agree to receive email communications about our launch and 
              product updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Waitlist Terms
            </h2>
            <p>By signing up for the InvoiceNudge waitlist, you agree that:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>You are providing accurate contact information</li>
              <li>We may contact you about product launches and updates</li>
              <li>Waitlist position does not guarantee early access</li>
              <li>You can unsubscribe at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Acceptable Use
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Submit false or misleading information</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated systems to submit multiple signups</li>
              <li>Interfere with the operation of our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, and software, is the 
              property of InvoiceNudge and is protected by intellectual property laws. You may not 
              reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Limitation of Liability
            </h2>
            <p>
              InvoiceNudge is provided "as is" without warranties of any kind. We are not liable 
              for any damages arising from your use of this website or our services. This limitation 
              applies to the fullest extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Changes to Terms
            </h2>
            <p>
              We may update these terms from time to time. When we launch the full service, these 
              terms will be updated to reflect the product's functionality. Continued use of our 
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-[var(--text-primary)] mb-4">
              Contact
            </h2>
            <p>
              Questions about these terms? Email us at{" "}
              <a
                href="mailto:legal@invoicenudge.com"
                className="text-[var(--accent)] hover:underline"
              >
                legal@invoicenudge.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}