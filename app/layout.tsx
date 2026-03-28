import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders for Freelancers",
  description: "Stop chasing payments. Forward your invoices, and our AI sends personalized reminders that match your tone. Join the waitlist.",
  keywords: ["invoice reminders", "freelancer payments", "payment follow-up", "AI invoicing", "late payment automation"],
  openGraph: {
    title: "InvoiceNudge — Get Paid Without the Awkward Follow-ups",
    description: "AI-powered payment reminders that sound like you wrote them. Built for freelancers who hate chasing invoices.",
    type: "website",
    url: "https://invoicenudge.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders for Freelancers",
    description: "Stop chasing payments. Forward your invoices, and our AI handles the rest.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "InvoiceNudge",
              description: "AI-powered payment reminders for freelancers",
              url: "https://invoicenudge.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're targeting April 2026. Join the waitlist to be first in line.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my clients know I'm using automation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Every reminder is written to sound like you. Your clients will think you wrote it personally.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="19b2e47e-1c57-482b-b412-a7679e062d0e" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}