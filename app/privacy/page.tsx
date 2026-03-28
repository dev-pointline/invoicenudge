import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — InvoiceNudge",
  description: "Privacy Policy for InvoiceNudge. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Privacy Policy</h1>
        </div>

        <p className="text-slate-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              InvoiceNudge ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
            <p className="text-slate-600 leading-relaxed">
              By using InvoiceNudge, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-slate-800 mb-3">Waitlist Information</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              When you join our waitlist, we collect your email address. This is used solely to notify you about our launch and provide early access opportunities.
            </p>

            <h3 className="text-lg font-medium text-slate-800 mb-3">Invoice Data (When Service Launches)</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              When you use InvoiceNudge, we will process invoice emails you forward to us. This includes:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>Client names and email addresses from invoices</li>
              <li>Invoice amounts and due dates</li>
              <li>The content of invoice emails for AI tone analysis</li>
              <li>Payment reminder history</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-800 mb-3">Usage Data</h3>
            <p className="text-slate-600 leading-relaxed">
              We automatically collect certain information about your device and how you interact with our service, including IP address, browser type, and pages visited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Send payment reminder emails on your behalf</li>
              <li>Analyze and improve our AI tone-matching algorithms</li>
              <li>Communicate with you about updates, features, and support</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>We do not sell your personal information or client data to third parties.</strong>
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">We may share information with:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our service (e.g., email delivery via Resend, AI processing via Groq, database hosting via Supabase)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your data:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Encryption of data in transit (TLS/SSL) and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to customer data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide services. Waitlist emails are retained until you unsubscribe or we launch and you choose not to sign up. You can request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Data portability (receive your data in a structured format)</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. GDPR Compliance</h2>
            <p className="text-slate-600 leading-relaxed">
              For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). Our legal basis for processing your data includes your consent, contract performance, and legitimate business interests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-slate-600 mt-4">
              <strong>Email:</strong> privacy@invoicenudge.com<br />
              <strong>Website:</strong> invoicenudge.pointline.dev
            </p>
          </section>
        </div>
      </article>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-500">© 2026 InvoiceNudge. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}