import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders for Freelancers",
  description: "Stop chasing late payments. AI-powered reminders that sound like you. Forward your invoice, we handle the follow-ups. Join the waitlist.",
  keywords: ["invoice reminders", "freelancer tools", "payment automation", "AI invoicing", "late payment solution"],
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI-powered payment reminders that sound like you, not a robot. Built for freelancers who hate awkward follow-ups.",
    type: "website",
    url: "https://invoicenudge.pointline.dev",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders",
    description: "Stop chasing late payments. AI reminders that match your tone.",
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
              url: "https://invoicenudge.pointline.dev",
              founder: {
                "@type": "Person",
                name: "Dor Tagger",
              },
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
                  name: "How does InvoiceNudge learn my tone?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We analyze your original invoice email: sentence length, formality level, emoji usage, greeting style. The AI mirrors your communication style in every reminder.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What if the AI writes something wrong?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Preview Mode shows you every email before it sends. You can edit, reject, or approve. You're never forced into autopilot.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're targeting Q2 2026. Join the waitlist to lock in founding member pricing.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="e6e92304-2700-4515-bca7-1df346aac2e5" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}