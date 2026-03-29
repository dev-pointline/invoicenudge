import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Automated Payment Reminders That Sound Like You",
  description: "Stop chasing late payments. Forward your invoice, AI sends polite reminders matching your tone. Built for freelancers who hate awkward follow-ups.",
  openGraph: {
    title: "InvoiceNudge — Never Chase Late Payments Again",
    description: "Forward your invoice. AI sends polite reminders that sound like you — not a robot. Get paid faster without the awkward follow-ups.",
    type: "website",
    url: "https://invoicenudge.com",
  },
  twitter: { 
    card: "summary_large_image",
    title: "InvoiceNudge — Automated Payment Reminders",
    description: "Stop chasing late payments. AI reminders that sound like you.",
  },
  keywords: ["invoice reminders", "payment follow-up", "freelancer tools", "late payment automation", "accounts receivable"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "InvoiceNudge",
              description: "Automated payment reminders for freelancers",
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
                    text: "We're targeting Q2 2026. Join the waitlist to be notified and lock in founding member pricing."
                  }
                },
                {
                  "@type": "Question",
                  name: "How is this different from FreshBooks reminders?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "FreshBooks bundles reminders with accounting features you may not need. We do one thing exceptionally: AI reminders that sound like you."
                  }
                },
                {
                  "@type": "Question",
                  name: "Will my clients know it's automated?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Emails come from your email address via Resend's infrastructure. Clients see your email address — no InvoiceNudge branding."
                  }
                }
              ]
            }),
          }}
        />
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="8059eb08-11de-406a-a183-5918e76fc404" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}