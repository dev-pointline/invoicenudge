import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Never Chase Late Payments Again",
  description: "AI-powered payment reminders that sound like you. Forward your invoice, we handle the follow-ups. Automated reminders on Day 0, 7, 14, and 21. Launching April 15, 2026.",
  openGraph: {
    title: "InvoiceNudge — Automated Payment Reminders for Freelancers",
    description: "Stop wasting 8-12 hours/month chasing late payments. Forward your invoice, AI sends polite reminders that match your tone. 60-day money-back guarantee.",
    type: "website",
    url: "https://invoicenudge.pointline.dev",
  },
  twitter: { 
    card: "summary_large_image",
    title: "InvoiceNudge — Never Chase Late Payments Again",
    description: "AI-powered payment reminders that sound like you. Launching April 15, 2026.",
  },
  keywords: ["invoice reminders", "freelance payments", "payment automation", "late payment follow-up", "AI invoice assistant"],
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
              url: "https://invoicenudge.pointline.dev",
              description: "AI-powered payment reminders for freelancers",
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@pointline.dev",
                contactType: "customer service",
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
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "InvoiceNudge launches April 15, 2026. Waitlist members get early access and founding member pricing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What if the AI writes something wrong?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Preview Mode lets you approve every email before it sends. You're always in control of what goes to your clients.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is there a money-back guarantee?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, 60-day refund with no questions asked. Test two full billing cycles risk-free.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="d19cf40e-0516-42a2-91eb-d1eadc97471b" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}