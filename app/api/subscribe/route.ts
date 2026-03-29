import { NextResponse } from "next/server";

const TELEMETRY_BASE_URL = process.env.TELEMETRY_BASE_URL || "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = process.env.TELEMETRY_TOKEN || "invoicenudge_waitlist_2026";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Store signup via telemetry endpoint
    await fetch(`${TELEMETRY_BASE_URL}/api/telemetry/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telemetryToken: TELEMETRY_TOKEN,
        eventType: "waitlist_signup",
        metadata: { 
          email, 
          source: "landing_page",
          product: "invoicenudge",
          timestamp: new Date().toISOString()
        },
      }),
    }).catch(() => null); // Non-blocking

    console.log(`[InvoiceNudge] Waitlist signup: ${email}`);

    return NextResponse.json({ 
      success: true, 
      message: "You're on the waitlist! We'll notify you when we launch." 
    });
  } catch (error) {
    console.error("[InvoiceNudge] Signup error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}