import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Get Paid Without the Awkward Follow-Ups",
  description: "Forward your invoices, let AI handle the reminders. Built for freelancers who hate chasing payments. Join the waitlist for early access.",
  keywords: ["invoice reminders", "freelancer payments", "payment automation", "late payment reminders", "invoice follow-up"],
  authors: [{ name: "InvoiceNudge" }],
  openGraph: {
    title: "InvoiceNudge — Get Paid Without the Awkward Follow-Ups",
    description: "Forward your invoices, let AI handle the reminders. Built for freelancers who hate chasing payments.",
    type: "website",
    locale: "en_US",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — Get Paid Without the Awkward Follow-Ups",
    description: "Forward your invoices, let AI handle the reminders. Built for freelancers who hate chasing payments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InvoiceNudge",
    description: "AI-powered payment reminders for freelancers",
    url: "https://invoicenudge.com",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When does InvoiceNudge launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're targeting a beta launch in Q2 2026. Join the waitlist to be notified when we're ready.",
        },
      },
      {
        "@type": "Question",
        name: "How does the preview mode work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Preview mode lets you see exactly what your client will receive before any reminder goes out. You approve each message, so nothing sends without your explicit OK.",
        },
      },
      {
        "@type": "Question",
        name: "What invoicing tools does InvoiceNudge work with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "InvoiceNudge is designed to work with any invoicing tool. Simply forward your invoice emails, and our AI extracts the relevant details automatically.",
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
      <body className="font-sans antialiased">{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="4057fbfd-f975-4a2a-b5c1-e6f7ade5cb7a" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}