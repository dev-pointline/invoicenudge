import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Get paid on time without awkward follow-ups",
  description: "AI-powered payment reminders for freelancers. Forward your invoices, get paid faster. Join the early access waitlist.",
  keywords: ["invoice reminders", "freelancer payments", "payment automation", "accounts receivable", "invoice follow-up"],
  openGraph: {
    title: "InvoiceNudge — Get paid on time without awkward follow-ups",
    description: "AI-powered payment reminders for freelancers. Forward your invoices, get paid faster.",
    type: "website",
    url: "https://invoicenudge.com",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — Get paid on time without awkward follow-ups",
    description: "AI-powered payment reminders for freelancers. Forward your invoices, get paid faster.",
  },
  robots: "index, follow",
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
              url: "https://invoicenudge.com",
              description: "AI-powered payment reminders for freelancers",
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
                  name: "How does email forwarding work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Forward any invoice email to pay@invoicenudge.com. Our AI reads the email and attachments to extract client, amount, and due date.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're in private beta now. Join the waitlist to get early access and launch pricing.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="e293fd95-66b3-4dfb-8732-2660942ea298" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}