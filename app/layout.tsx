import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — AI Payment Reminders That Sound Like You",
  description: "Stop chasing late payments. InvoiceNudge sends AI-powered, personalized invoice reminders in your voice. Designed to help freelancers get paid 16 days faster. Join the waitlist for early access.",
  keywords: ["invoice reminder", "freelance payment", "late payment", "AI invoice", "get paid faster", "payment automation", "freelancer tools"],
  openGraph: {
    title: "Stop Writing 'Just Checking In...' Emails — InvoiceNudge",
    description: "AI sends polite payment reminders in your voice. Designed to help freelancers get paid 16 days faster. First 100 invoices free.",
    type: "website",
    url: "https://invoicenudge.com",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — AI Payment Reminders for Freelancers",
    description: "Stop chasing late payments. AI sends polite follow-ups in your voice. Join the waitlist.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet" />
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
                    text: "When you forward an invoice email to nudge@invoicenudge.com, our AI extracts the due date and schedules automatic reminders at Day 0, Day 3, Day 7, and Day 14.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Will my clients know I'm using automation?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Reminders are sent from your authenticated email address, not from @invoicenudge.com. To your client, it looks exactly like you personally wrote each reminder.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're targeting Q2 2026 for public launch. Join the waitlist now to get beta access in 8 weeks.",
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
                window.TELEMETRY_TOKEN = "3423ec18-518e-420c-aa6e-09aea84ebde3";
                window.TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="05b180c4-dded-40dd-aae1-8fdb5bb4e4d6" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}