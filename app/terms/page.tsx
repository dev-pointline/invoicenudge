import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — InvoiceNudge",
  description: "Terms of Service for InvoiceNudge. Please read these terms carefully before using our service.",
};

export default function TermsPage() {
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
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Terms of Service</h1>
        </div>

        <p className="text-slate-500 mb-8">Last updated: January 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              By accessing or using InvoiceNudge ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p className="text-slate-600 leading-relaxed">
              These Terms apply to all visitors, users, and others who access or use the Service, including the pre-launch waitlist.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Description of Service</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              InvoiceNudge is an AI-powered payment reminder service for freelancers. The Service allows users to:
            </p>
            <ul className="list-disc list-inside text-slate-600 mb-4 space-y-2">
              <li>Forward invoice emails to our system</li>
              <li>Have AI-generated payment reminders sent on their behalf</li>
              <li>Preview and approve reminder emails before sending</li>
              <li>Track payment status and reminder history</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              <strong>Pre-Launch Status:</strong> The Service is currently in development. By joining the waitlist, you agree to receive communications about our launch and early access opportunities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. User Accounts</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.
            </p>
            <p className="text-slate-600 leading-relaxed">
              You are responsible for safeguarding your account credentials and for any activities or actions under your account. You must notify us immediately of any unauthorized use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Acceptable Use</h2>
            <p className="text-slate-600 leading-relaxed mb-4">You agree NOT to use the Service to:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Send spam, harassment, or fraudulent communications</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate others or misrepresent your affiliation</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Attempt to gain unauthorized access to any systems</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Send reminders for invoices that are not legitimate business transactions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are owned by InvoiceNudge and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-slate-600 leading-relaxed">
              You retain ownership of all content you submit to the Service (such as invoice data). By using the Service, you grant us a limited license to process this content solely for the purpose of providing the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Payment Terms</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Pricing:</strong> Subscription fees are charged monthly or annually, as selected at signup. Prices are subject to change with 30 days notice.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Refunds:</strong> We offer a 60-day money-back guarantee for all plans. If you're not satisfied for any reason, contact us within 60 days of your purchase for a full refund.
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong>Cancellation:</strong> You may cancel your subscription at any time. Access continues until the end of your current billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Email Delivery</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              While we use industry-standard email delivery infrastructure and implement best practices for deliverability (SPF, DKIM, DMARC), we cannot guarantee that all reminder emails will be delivered to recipients' inboxes.
            </p>
            <p className="text-slate-600 leading-relaxed">
              You acknowledge that email delivery depends on factors outside our control, including recipient email providers' spam filters and policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              To the maximum extent permitted by law, InvoiceNudge shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Damage to business relationships</li>
              <li>Failure to collect payments from your clients</li>
              <li>Any actions taken by your clients in response to reminder emails</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Our total liability shall not exceed the amount you paid for the Service in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Disclaimer of Warranties</h2>
            <p className="text-slate-600 leading-relaxed">
              The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Indemnification</h2>
            <p className="text-slate-600 leading-relaxed">
              You agree to defend, indemnify, and hold harmless InvoiceNudge and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">11. Termination</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Upon termination, your right to use the Service will cease immediately. You may request export of your data within 30 days of termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">12. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. Material changes will be communicated via email or prominent notice on our website at least 30 days before taking effect. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">13. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">14. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-slate-600 mt-4">
              <strong>Email:</strong> legal@invoicenudge.com<br />
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