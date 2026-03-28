import { Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — InvoiceNudge",
  description: "Learn how InvoiceNudge collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-medium text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last updated: March 28, 2026</p>

        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed">
              InvoiceNudge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              During our pre-launch phase, we collect minimal information:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>Email address</strong> — Required to join our waitlist and receive launch notifications</li>
              <li><strong>Name</strong> — Optional, if provided when signing up</li>
              <li><strong>Usage data</strong> — Basic analytics about how you interact with our website</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Notify you when InvoiceNudge launches</li>
              <li>Send occasional updates about our product development</li>
              <li>Improve our website and service</li>
              <li>Respond to your inquiries and support requests</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Data Sharing</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share data with service providers who help us operate our business (e.g., email service providers), but only to the extent necessary and under strict confidentiality agreements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Data Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              We retain your email address and any associated information until you unsubscribe from our waitlist or request deletion. You can unsubscribe at any time by clicking the unsubscribe link in any email we send, or by contacting us directly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Unsubscribe from our communications at any time</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-medium text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this privacy policy or our data practices, please contact us at{" "}
              <a href="mailto:privacy@invoicenudge.com" className="text-orange-500 hover:text-orange-600">
                privacy@invoicenudge.com
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