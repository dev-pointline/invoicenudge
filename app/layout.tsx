import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders That Sound Like You",
  description: "Stop chasing late payments. InvoiceNudge sends AI-powered reminders in your voice, helping freelancers get paid up to 16 days faster. Join the waitlist for early access.",
  keywords: ["invoice reminder", "freelance payment", "AI invoice", "late payment", "get paid faster", "payment automation"],
  openGraph: {
    title: "InvoiceNudge — Stop Writing 'Just Checking In' Emails",
    description: "AI sends polite payment reminders in your voice. Freelancers report getting paid up to 16 days faster.",
    type: "website",
    url: "https://invoicenudge.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoiceNudge - AI Payment Reminders for Freelancers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders",
    description: "Stop chasing late payments. AI sends reminders that sound like you.",
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
    "https://www.producthunt.com/products/invoicenudge"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Will my clients know I'm using automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Reminders are sent from your email address using authenticated sending. To your client, it looks like you personally wrote and sent each message."
      }
    },
    {
      "@type": "Question",
      name: "When does InvoiceNudge launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We're planning a Q2 2026 public launch. Join the waitlist now to get early beta access and lifetime launch pricing."
      }
    },
    {
      "@type": "Question",
      name: "Can I use InvoiceNudge with FreshBooks, QuickBooks, or Wave?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! InvoiceNudge works with any invoicing tool. Just forward the invoice email — no integrations to configure, no data to migrate."
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased bg-[#0f172a] text-[#f8fafc]`}>
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="9d4267c4-cd11-4cbd-9ae3-ea6a32a479e8" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}