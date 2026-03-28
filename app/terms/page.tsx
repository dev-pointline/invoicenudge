import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-stone-900">
            <Mail className="w-6 h-6 text-orange-500" />
            InvoiceNudge
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-3xl font-bold text-stone-900 mb-8">Terms of Service</h1>

        <div className="prose prose-stone max-w-none">
          <p className="text-stone-600 mb-6">Last updated: March 2026</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Service Description</h2>
          <p className="text-stone-600 mb-4">InvoiceNudge provides AI-powered payment reminder drafting and scheduling for freelancers and agencies.</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Your Responsibilities</h2>
          <p className="text-stone-600 mb-4">You are responsible for reviewing reminder content before approval. You must have permission to contact the email addresses you provide.</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Payments</h2>
          <p className="text-stone-600 mb-4">Paid plans are billed monthly through Polar. You may cancel anytime. No refunds for partial months.</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-stone-600">InvoiceNudge is not responsible for client responses or payment outcomes. Use at your own discretion.</p>
        </div>
      </main>
    </div>
  );
}