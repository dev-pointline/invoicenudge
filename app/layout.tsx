import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Stop Chasing Late Payments | AI Payment Reminders",
  description: "Forward your invoice. We handle the follow-ups. Get paid 14 days faster with AI-powered payment reminders that sound like you. Join the waitlist.",
  keywords: ["invoice reminders", "freelancer payments", "automated follow-ups", "payment automation", "late payment solution"],
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "Forward your invoice. We handle the follow-ups. Get paid 14 days faster with AI-powered payment reminders.",
    type: "website",
    url: "https://invoicenudge.com",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "Forward your invoice. We handle the follow-ups. Get paid 14 days faster.",
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
                    text: "We're targeting launch within 8-12 weeks. Join the waitlist to be notified the moment we're live.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my clients know I'm using an automation tool?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Emails come from your email address and match your communication style. There's no visible branding.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need to connect my accounting software?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Just forward your invoice emails. No QuickBooks, Xero, or FreshBooks integration required.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="2de4b11a-bf6e-4b73-8fdf-d923e6f59110" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}