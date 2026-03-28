import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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

        <h1 className="text-3xl font-bold text-stone-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-stone max-w-none">
          <p className="text-stone-600 mb-6">Last updated: March 2026</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Information We Collect</h2>
          <p className="text-stone-600 mb-4">We collect information you provide directly: email address, name, invoice details (client names, amounts, due dates), and writing samples for tone matching.</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-stone-600 mb-4">We use your information to provide the InvoiceNudge service: generating reminder emails, scheduling sends, and tracking payment status. We do not sell your data.</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Data Storage</h2>
          <p className="text-stone-600 mb-4">Your data is stored securely using Supabase (PostgreSQL) with encryption at rest. We retain your data for as long as your account is active.</p>

          <h2 className="text-xl font-semibold text-stone-900 mt-8 mb-4">Contact</h2>
          <p className="text-stone-600">For privacy questions, email privacy@pointline.dev</p>
        </div>
      </main>
    </div>
  );
}