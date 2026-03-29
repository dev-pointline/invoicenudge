import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Get Paid 14 Days Faster with AI Payment Reminders",
  description: "Stop chasing late payments. Forward your invoice and let AI send polite reminders that sound like you. Built for freelancers who hate awkward money conversations.",
  keywords: ["invoice reminders", "payment automation", "freelancer tools", "late payment", "accounts receivable"],
  openGraph: {
    title: "InvoiceNudge — Never Chase Late Payments Again",
    description: "AI-powered payment reminders that sound like you, not a robot. Get paid 14 days faster without awkward client conversations.",
    type: "website",
    url: "https://invoicenudge.com",
  },
  twitter: { 
    card: "summary_large_image",
    title: "InvoiceNudge — Get Paid Faster",
    description: "AI payment reminders for freelancers. Forward invoice → AI handles the rest."
  },
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
                  name: "What if the AI writes something that upsets my client?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "That's why we built Preview Mode. You approve every reminder before it sends. After 5 approvals, you can unlock Autopilot Mode — or stay in Preview forever."
                  }
                },
                {
                  "@type": "Question",
                  name: "Why not just use Wave for free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Wave's reminders only work if you accept payments through Wave (2.9% + $0.60 per transaction). InvoiceNudge is $19/month flat and works with any payment method."
                  }
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "April 2026. Join the waitlist to be notified and lock in $19/month founding member pricing."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="ad7e0165-ef1b-4f91-ba0d-3c7111aa1a35" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}