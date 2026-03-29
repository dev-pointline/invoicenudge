import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders for Freelancers",
  description: "Stop chasing late payments. InvoiceNudge sends AI-powered payment reminders that sound like you — not a robot. Built for freelancers who invoice clients.",
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Clients. Start Getting Paid.",
    description: "Forward your invoices. AI sends polite reminders. You focus on the work. Built for freelancers who are tired of awkward payment follow-ups.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
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
                    text: "We're launching in April 2026. Join the waitlist to be notified first.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my clients know I'm using AI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Emails come from your email address. Clients see you, not InvoiceNudge.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does this work with my invoicing software?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — InvoiceNudge is invoice-agnostic. Forward invoices from FreshBooks, Wave, Bonsai, QuickBooks, or any PDF.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="0d76e7d1-512b-401f-a077-552397cb3f7d" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}