import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service — InvoiceNudge",
  description: "Terms and conditions for using InvoiceNudge.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to InvoiceNudge
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-[#FF6B6B] flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
        </div>

        <p className="text-slate-600 mb-8">
          Last updated: March 28, 2026
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Service Description</h2>
            <p className="text-slate-600 mb-4">
              InvoiceNudge is a pre-launch service that will provide AI-powered payment reminder automation for freelancers. Currently, we offer a waitlist for early access to our service when it launches.
            </p>
            <p className="text-slate-600">
              By joining our waitlist, you agree to receive email communications about InvoiceNudge&apos;s launch and updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Acceptable Use</h2>
            <p className="text-slate-600 mb-4">
              When using InvoiceNudge (upon launch), you agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Use the service only for legitimate business invoicing purposes</li>
              <li>Not send harassing, threatening, or fraudulent payment reminders</li>
              <li>Not use the service to collect debts you are not legally entitled to</li>
              <li>Provide accurate information about yourself and your invoices</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Intellectual Property</h2>
            <p className="text-slate-600 mb-4">
              The InvoiceNudge name, logo, and website content are owned by InvoiceNudge and protected by intellectual property laws.
            </p>
            <p className="text-slate-600">
              You retain ownership of all invoice data and content you provide to our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              InvoiceNudge is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Payment reminders will result in faster payment from your clients</li>
              <li>Emails will be delivered to all recipients (email deliverability varies)</li>
              <li>The service will be available 100% of the time</li>
            </ul>
            <p className="text-slate-600 mt-4">
              To the maximum extent permitted by law, InvoiceNudge shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Refund Policy</h2>
            <p className="text-slate-600">
              Upon launch, InvoiceNudge will offer a 60-day money-back guarantee. If you are not satisfied with the service for any reason, contact us within 60 days of your purchase for a full refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Termination</h2>
            <p className="text-slate-600 mb-4">
              You may cancel your waitlist subscription or (upon launch) your paid subscription at any time.
            </p>
            <p className="text-slate-600">
              We reserve the right to terminate accounts that violate these terms or engage in abusive behavior.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">7. Changes to Terms</h2>
            <p className="text-slate-600">
              We may update these terms from time to time. We will notify waitlist members of significant changes via email. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">8. Contact</h2>
            <p className="text-slate-600">
              For questions about these Terms of Service, contact us at:{" "}
              <a href="mailto:legal@invoicenudge.com" className="text-[#FF6B6B] hover:underline">
                legal@invoicenudge.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}