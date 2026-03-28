import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders for Freelancers",
  description: "Stop chasing late payments. InvoiceNudge sends AI-powered, personalized invoice reminders in your voice. Get paid 16 days faster on average. First 100 invoices free.",
  keywords: ["invoice reminder", "freelance payment", "late payment", "AI invoice", "get paid faster", "payment follow-up", "freelancer tools"],
  openGraph: {
    title: "Stop Writing 'Just Checking In' Emails — InvoiceNudge",
    description: "AI sends polite payment reminders in your voice so you get paid faster. Join 500 freelancers on the waitlist.",
    type: "website",
    url: "https://invoicenudge.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoiceNudge - AI Payment Reminders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — Get Paid 16 Days Faster",
    description: "AI-powered payment reminders that sound like you. First 100 invoices free.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InvoiceNudge",
  description: "AI-powered payment reminders for freelancers",
  url: "https://invoicenudge.com",
  logo: "https://invoicenudge.com/logo.png",
  sameAs: [
    "https://twitter.com/invoicenudge",
    "https://www.producthunt.com/posts/invoicenudge"
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does InvoiceNudge know when to send reminders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "When you forward an invoice email, our AI extracts the due date and client email automatically. Reminders are scheduled for Day 0, Day 3, Day 7, Day 14, and Day 21."
      }
    },
    {
      "@type": "Question",
      name: "Will my clients know I'm using automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Reminders are sent from your email address via our authenticated sending, not from @invoicenudge.com. To your client, it looks exactly like you personally wrote the message."
      }
    },
    {
      "@type": "Question",
      name: "When does InvoiceNudge launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We're targeting Q2 2026 (April-June). Join the waitlist to get early access and your first 100 invoices free."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="8b0937ff-5080-4691-b0bf-1add5fb964fe" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}