import { NextRequest, NextResponse } from "next/server";

const TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = "pl_tel_invoicenudge_2026";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Log to telemetry endpoint (non-blocking)
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
          timestamp: new Date().toISOString(),
        },
      }),
    }).catch(() => null);

    // Log to server console for backup
    console.log(`[Waitlist Signup] ${email} at ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll email you when we launch.",
    });
  } catch (error) {
    console.error("[Subscribe Error]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}