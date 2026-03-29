import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Stop Chasing Late Payments",
  description: "AI-powered payment reminders that sound like you, not a robot. Forward your invoice, get paid 14 days faster. Built for freelancers who hate awkward follow-ups.",
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI-powered payment reminders that sound like you, not a robot. Get paid 14 days faster without the awkward follow-ups.",
    type: "website",
    url: "https://invoicenudge.com",
  },
  twitter: { card: "summary_large_image" },
  keywords: ["invoice reminders", "freelancer payments", "late payment automation", "AI invoice follow-up", "get paid faster"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InvoiceNudge",
  description: "AI-powered payment reminder automation for freelancers",
  url: "https://invoicenudge.com",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does InvoiceNudge launch?",
      acceptedAnswer: { "@type": "Answer", text: "April 2026. Join the waitlist to lock in founding member pricing." }
    },
    {
      "@type": "Question",
      name: "Will there be a free trial?",
      acceptedAnswer: { "@type": "Answer", text: "Yes — 7-day free trial, no credit card required." }
    },
    {
      "@type": "Question",
      name: "What if the AI says something embarrassing?",
      acceptedAnswer: { "@type": "Answer", text: "Preview Mode lets you approve every email before it sends. You're always in control." }
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className={`${GeistSans.className} antialiased`}>
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="7307a8b2-9f70-4af2-b526-6bdd581476af" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}