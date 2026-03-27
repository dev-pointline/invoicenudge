import type { Metadata } from "next";
import { Source_Sans_3, Fraunces } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders for Freelancers",
  description: "Stop chasing late payments. AI sends polite, escalating reminders so you get paid faster — without the awkward follow-up emails. Join the waitlist.",
  keywords: ["invoice reminder", "freelance payments", "late payment", "payment follow-up", "AI invoicing"],
  openGraph: {
    title: "InvoiceNudge — Stop Writing Awkward Follow-Up Emails",
    description: "AI sends polite payment reminders so you never have to chase clients again. Forward your invoice, we handle the rest.",
    type: "website",
    locale: "en_US",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders for Freelancers",
    description: "Stop chasing late payments. AI sends polite, escalating reminders so you get paid faster.",
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
    <html lang="en" className={`${sourceSans.variable} ${fraunces.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "InvoiceNudge",
              "description": "AI-powered payment reminders for freelancers",
              "url": "https://invoicenudge.com",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How is InvoiceNudge different from FreshBooks reminders?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "InvoiceNudge sends AI-personalized messages that match your brand voice and escalate professionally over time, while FreshBooks sends generic templates."
                  }
                },
                {
                  "@type": "Question",
                  "name": "When does InvoiceNudge launch?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We're targeting Summer 2026 for public launch. Waitlist members get early access in late Spring 2026."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="16549b98-59c0-4c5c-b244-02c5617be173" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}