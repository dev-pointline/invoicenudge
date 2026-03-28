import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — InvoiceNudge",
  description: "How InvoiceNudge collects, uses, and protects your data.",
};

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        </div>

        <p className="text-slate-600 mb-8">
          Last updated: March 28, 2026
        </p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              InvoiceNudge collects the following information:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>Email address:</strong> When you join our waitlist, we collect your email address to notify you when InvoiceNudge launches.
              </li>
              <li>
                <strong>Invoice data (future):</strong> When the product launches, we will process invoice emails you forward to us, including client names, invoice amounts, and due dates. This data is used solely to send payment reminders on your behalf.
              </li>
              <li>
                <strong>Usage data:</strong> We collect anonymized analytics about how you use our website (pages visited, features used) to improve our service.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>To send you updates about InvoiceNudge&apos;s launch and features</li>
              <li>To process and send payment reminders on your behalf (when the product launches)</li>
              <li>To improve our service based on usage patterns</li>
              <li>To respond to your support requests</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Data Sharing</h2>
            <p className="text-slate-600 mb-4">
              We do <strong>not</strong> sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
            <p className="text-slate-600 mb-4">
              We may share data with trusted service providers who help us operate our service:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>Resend:</strong> For sending emails (including payment reminders and waitlist notifications)
              </li>
              <li>
                <strong>Vercel:</strong> For hosting our website</li>
              <li>
                <strong>Supabase:</strong> For database storage</li>
            </ul>
            <p className="text-slate-600 mt-4">
              These providers are bound by confidentiality agreements and only process data on our behalf.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Data Retention</h2>
            <p className="text-slate-600 mb-4">
              We retain your email address on our waitlist until you unsubscribe or request deletion.
            </p>
            <p className="text-slate-600">
              Invoice data (when the product launches) will be retained for 12 months after your last invoice activity, or until you delete your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Unsubscribe from our waitlist at any time</li>
            </ul>
            <p className="text-slate-600 mt-4">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@invoicenudge.com" className="text-[#FF6B6B] hover:underline">
                privacy@invoicenudge.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Security</h2>
            <p className="text-slate-600">
              We implement industry-standard security measures to protect your data, including encryption in transit (HTTPS) and at rest. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
            <p className="text-slate-600">
              If you have questions about this Privacy Policy, contact us at:{" "}
              <a href="mailto:privacy@invoicenudge.com" className="text-[#FF6B6B] hover:underline">
                privacy@invoicenudge.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}