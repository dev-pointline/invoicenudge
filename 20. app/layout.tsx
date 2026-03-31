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
      <body className={GeistSans.className}>{children}        <script defer src="/pipeline-telemetry.js" data-telemetry-token="3dfe1fd5-9dab-4154-a942-98eb1f91b67b" data-telemetry-base-url="https://hooks.pointline.dev"></script>
      </body>
    </html>
  );
}