import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Stop Chasing Late Payments",
  description: "Forward your invoice. We send polite AI-powered reminders that sound like you. Freelancers get paid on time without awkward follow-ups.",
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI-powered payment reminders for freelancers. Forward your invoice, we handle the follow-ups.",
    type: "website",
    url: "https://invoicenudge.com",
  },
  twitter: { 
    card: "summary_large_image",
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI-powered payment reminders for freelancers. Forward your invoice, we handle the follow-ups.",
  },
  keywords: ["invoice reminders", "freelancer payments", "payment follow-up", "late payment automation", "AI invoice assistant"],
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
              url: "https://invoicenudge.com",
              description: "AI-powered payment reminders for freelancers",
              foundingDate: "2026",
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
                  name: "What if AI writes something that offends my client?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Preview Mode shows you every email before it sends. Approve, edit, or reject. You stay in full control.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Why not just use Wave or FreshBooks?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Those require using their payment processing or full accounting suite. InvoiceNudge works with ANY invoice, ANY payment method — just forward the email.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "April 2026. Join the waitlist for early access and founding member pricing.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="1a965a7d-ab3b-44f5-814d-00fa213c2dc2" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}