import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Automated Payment Reminders That Sound Like You",
  description: "Stop chasing late payments. Forward your invoice, AI sends polite reminders matching your tone. Built for freelancers who hate awkward follow-ups.",
  openGraph: {
    title: "InvoiceNudge — Never Chase Late Payments Again",
    description: "Forward your invoice. AI sends polite reminders that sound like you — not a robot. Get paid faster without the awkward follow-ups.",
    type: "website",
    url: "https://invoicenudge.pointline.dev",
  },
  twitter: { 
    card: "summary_large_image",
    title: "InvoiceNudge — Automated Payment Reminders",
    description: "Stop chasing late payments. AI reminders that sound like you.",
  },
  keywords: ["invoice reminders", "payment follow-up", "freelancer tools", "late payment automation", "accounts receivable"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "InvoiceNudge",
              description: "Automated payment reminders for freelancers",
              url: "https://invoicenudge.pointline.dev",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "19",
                priceCurrency: "USD",
              },
            }),
          }}
        />
              <script defer src="/pipeline-telemetry.js" data-telemetry-token="1fae395f-215b-47d8-9487-7f446aba6d13" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}