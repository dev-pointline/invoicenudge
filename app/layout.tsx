import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Stop Chasing Late Payments",
  description: "AI-powered payment reminders that sound like you. Forward your invoice, get paid 14 days faster. Join the waitlist for early access.",
  keywords: ["invoice reminders", "freelancer payments", "late payment automation", "AI invoice follow-up", "payment collection"],
  openGraph: {
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI-powered payment reminders that sound like you. Forward your invoice, get paid 14 days faster.",
    type: "website",
    url: "https://invoicenudge.com",
    siteName: "InvoiceNudge",
  },
  twitter: {
    card: "summary_large_image",
    title: "InvoiceNudge — Stop Chasing Late Payments",
    description: "AI-powered payment reminders that sound like you. Forward your invoice, get paid 14 days faster.",
  },
  robots: "index, follow",
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
                  name: "What if the AI writes something that upsets my client?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "That's why we built Preview Mode. Every reminder is drafted by AI but approved by you before sending. You see exactly what your client will see.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How is this different from FreshBooks or QuickBooks?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "InvoiceNudge's AI learns YOUR communication style. If you're casual, we're casual. If you're formal, we're formal. Plus, we're not bundled with accounting features you don't need.",
                  },
                },
                {
                  "@type": "Question",
                  name: "When does InvoiceNudge launch?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We're targeting Q2 2026 for public launch. Join the waitlist to get early access and lock in founding member pricing.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        {children}
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="0a371988-eb04-40d4-9661-c38e86406474" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}