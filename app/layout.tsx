import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Stop Chasing Late Payments",
  description: "AI-powered payment reminders that sound like you. Forward your invoice, approve the reminders, get paid faster. Built for freelancers.",
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "Forward your invoice. AI sends polite reminders that match your tone. You approve every email before it sends.",
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
              url: "https://invoicenudge.pointline.dev",
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
                    text: "Q2 2026. Join the waitlist to get early access and founding member pricing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my clients know I'm using automation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Emails come from your address via our infrastructure. No 'Sent via InvoiceNudge' footer.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What if the AI writes something wrong?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Preview Mode shows you every email before it sends. You approve, edit, or reject. You're always in control.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="71efa47c-2b91-4a53-a0e2-20e2efe44340" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}