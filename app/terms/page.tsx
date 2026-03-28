import { Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — InvoiceNudge",
  description: "Read the terms and conditions for using InvoiceNudge.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="border-b border-slate-100 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-slate-900">InvoiceNudge</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-medium text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-500 mb-12">Last updated: March 28, 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using the InvoiceNudge website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">2. Service Description</h2>
            <p className="text-slate-600 leading-relaxed">
              InvoiceNudge is currently in pre-launch phase. By joining our waitlist, you agree to receive email communications about our service launch, product updates, and related information. The full service, once launched, will provide AI-powered payment reminder automation for freelancers and small businesses.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">3. User Responsibilities</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              When using our service, you agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to interfere with or disrupt the service</li>
              <li>Not use the service to send spam or harass others</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">4. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              All content, features, and functionality of InvoiceNudge, including but not limited to text, graphics, logos, and software, are owned by InvoiceNudge and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              InvoiceNudge and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-slate-600 leading-relaxed">
              The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">7. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or by posting a notice on our website. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">8. Termination</h2>
            <p className="text-slate-600 leading-relaxed">
              We may terminate or suspend your access to the service at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">9. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">10. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              For questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:legal@invoicenudge.com" className="text-orange-500 hover:text-orange-600">
                legal@invoicenudge.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link href="/" className="text-orange-500 hover:text-orange-600 font-medium">
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}