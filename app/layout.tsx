import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders for Freelancers",
  description: "Stop chasing late payments. Forward your invoice, AI sends reminders that sound like you. Join the waitlist for early access.",
  keywords: ["invoice reminders", "freelance payments", "AI automation", "payment follow-up", "accounts receivable"],
  authors: [{ name: "InvoiceNudge" }],
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI-powered payment reminders that sound like you, not a robot. Built for freelancers.",
    url: "https://invoicenudge.pointline.dev",
    siteName: "InvoiceNudge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders for Freelancers",
    description: "Stop chasing late payments. Forward your invoice, AI sends reminders that sound like you.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InvoiceNudge",
    description: "AI-powered payment reminders for freelancers",
    url: "https://invoicenudge.pointline.dev",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the AI learn my tone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When you forward an invoice, our AI analyzes your writing style — sentence length, formality level, emoji usage, greeting style. It uses this to generate reminders that match your voice.",
        },
      },
      {
        "@type": "Question",
        name: "What if the AI writes something I don't like?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "That's why Preview Mode exists. You see every reminder before it sends. Click Approve if it's good, or Edit to adjust. You're always in control.",
        },
      },
      {
        "@type": "Question",
        name: "Will my clients know I'm using automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Emails come from your email address, not from InvoiceNudge. There's no visible branding unless you choose to add it.",
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="f779c7ca-6ebe-4c0e-a414-ca92c08c6f17" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}