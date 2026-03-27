import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders for Freelancers",
  description: "Stop chasing late payments. AI sends polite follow-ups in your voice, so freelancers get paid faster. Join the waitlist for early access.",
  keywords: ["invoice reminder", "freelance payment", "late payment", "AI invoice", "get paid faster", "payment follow-up", "freelancer tools"],
  openGraph: {
    title: "InvoiceNudge — Stop Writing 'Just Checking In' Emails",
    description: "AI sends polite payment follow-ups in your voice. Designed to help freelancers get paid faster without awkward conversations.",
    type: "website",
    locale: "en_US",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders for Freelancers",
    description: "Stop chasing late payments. AI sends polite follow-ups in your voice.",
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
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                  name: "How does InvoiceNudge know when to send reminders?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "When you forward an invoice email, our AI extracts the due date, client info, and amount. It automatically schedules reminders at Day 0 (due date), Day 3, Day 7, Day 14, and Day 21.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my clients know I'm using automation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No — reminders are sent from your email address using authenticated sending. To your client, it looks like you personally wrote and sent each message.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're targeting launch in Q2 2026. Waitlist members will get early access and a lifetime discount on any plan.",
                  },
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.PIPELINE_TELEMETRY = {
                  baseUrl: "https://hooks.pointline.dev",
                  token: "pl_tel_invoicenudge_2026"
                };
              })();
            `,
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-dm-sans)] antialiased">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="3423ec18-518e-420c-aa6e-09aea84ebde3" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}