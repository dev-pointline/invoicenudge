import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
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

        <h1 className="text-3xl font-medium text-stone-900 mb-8">Privacy Policy</h1>
        <p className="text-sm text-stone-500 mb-8">Last updated: March 28, 2026</p>

        <div className="prose prose-stone max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">Overview</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              InvoiceNudge ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">Information We Collect</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              <strong>Waitlist Information:</strong> When you join our waitlist, we collect your email address and optionally your name. This information is used solely to notify you about our launch and product updates.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              <strong>Usage Data:</strong> We may collect anonymous usage data about how you interact with our website, including pages visited, time spent, and referral sources. This helps us improve our website experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>To send you updates about our product launch and early access opportunities</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">Data Sharing</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>With service providers who assist us in operating our website (e.g., email delivery services)</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">Data Security</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">Data Retention</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We retain your waitlist information until you request removal or until our product launches and you convert to a customer account. You can request deletion of your data at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">Your Rights</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-stone-600 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-medium text-stone-900 mb-4">Contact Us</h2>
            <p className="text-stone-600 leading-relaxed">
              If you have any questions about this privacy policy or our data practices, please contact us at:{" "}
              <a href="mailto:privacy@invoicenudge.com" className="text-orange-500 hover:text-orange-600">
                privacy@invoicenudge.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}