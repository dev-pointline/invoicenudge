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
  title: "InvoiceNudge — AI Payment Reminders That Sound Like You",
  description: "Stop writing awkward follow-up emails. InvoiceNudge sends AI-powered payment reminders in your voice so freelancers get paid faster. Join 500 freelancers on the waitlist.",
  keywords: ["invoice reminder", "freelance payment", "late payment automation", "AI invoice", "get paid faster", "freelancer tools"],
  authors: [{ name: "InvoiceNudge" }],
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI sends polite payment reminders that sound like you wrote them. Freelancers get paid 16 days faster on average.",
    url: "https://invoicenudge.com",
    siteName: "InvoiceNudge",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders for Freelancers",
    description: "Stop writing 'Just checking in...' emails. Get paid 16 days faster.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "InvoiceNudge",
              url: "https://invoicenudge.com",
              description: "AI-powered payment reminders for freelancers",
              foundingDate: "2025",
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
                    text: "When you forward an invoice to nudge@invoicenudge.com, our AI reads the email and extracts the due date. We automatically schedule reminders for Day 0, Day 3, Day 7, and Day 14.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my clients know I'm using InvoiceNudge?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No! Reminders are sent from your email address using authenticated forwarding. Your client sees your email address as the sender.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're targeting Q2 2026 for public launch. Beta testers on our waitlist get early access starting March 2026.",
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
                  token: "3423ec18-518e-420c-aa6e-09aea84ebde3"
                };
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="dcc038f4-31e7-4d2c-b58e-44ee1463c1b4" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}