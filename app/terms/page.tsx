import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-3xl font-medium text-stone-900 mb-8">Terms of Service</h1>
        <p className="text-sm text-stone-500 mb-8">Last updated: March 28, 2026</p>

        <div className="prose prose-stone max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              By accessing or using the InvoiceNudge website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">2. Description of Service</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              InvoiceNudge is a pre-launch product. Currently, we offer a waitlist for early access to our AI-powered payment reminder service. By joining the waitlist, you will receive updates about our launch and may be invited to participate in early access programs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">3. Waitlist Registration</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              When you join our waitlist, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of any account credentials once the product launches.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">4. Acceptable Use</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Use the service for any unlawful purpose</li>
              <li>Submit false or misleading information</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use automated systems to access the service without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">5. Intellectual Property</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              All content on the InvoiceNudge website, including text, graphics, logos, and software, is the property of InvoiceNudge or its licensors and is protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              The service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              To the maximum extent permitted by law, InvoiceNudge shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">8. Changes to Terms</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. We will notify you of significant changes via the email address you provided. Your continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">9. Governing Law</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">10. Contact Information</h2>
            <p className="text-stone-600 leading-relaxed">
              For questions about these Terms of Service, please contact us at:{" "}
              <a href="mailto:legal@invoicenudge.com" className="text-orange-500 hover:text-orange-600">
                legal@invoicenudge.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}