import { NextResponse } from "next/server";

const TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = "pl_tel_invoicenudge_2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Log to console for development
    console.log(`[WAITLIST] New signup: ${email}${name ? ` (${name})` : ""}`);

    // Send telemetry event (non-blocking)
    fetch(`${TELEMETRY_BASE_URL}/api/telemetry/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telemetryToken: TELEMETRY_TOKEN,
        eventType: "waitlist_signup",
        metadata: { 
          email, 
          name: name || null, 
          source: "landing_page",
          timestamp: new Date().toISOString()
        },
      }),
    }).catch((err) => {
      console.error("[TELEMETRY] Failed to send event:", err);
    });

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll notify you when we launch.",
    });
  } catch (error) {
    console.error("[WAITLIST] Error processing signup:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}