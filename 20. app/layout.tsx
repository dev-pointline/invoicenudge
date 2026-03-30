import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "InvoiceNudge — Never Chase Late Payments Again",
  description: "AI-powered payment reminders that sound like you. Forward your invoice, we handle the follow-ups.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className={GeistSans.className}>{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="4b8ff60c-cacd-4c73-8c22-fe91a166af44" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}