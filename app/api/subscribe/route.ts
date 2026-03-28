import { NextRequest, NextResponse } from "next/server";

const TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = "plh_6be5567e-5b19-40a2-82a7-5f3239a7260c";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send to telemetry endpoint
    await fetch(`${TELEMETRY_BASE_URL}/api/telemetry/event`, {
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
    }).catch(() => null); // Non-blocking

    // Log for debugging
    console.log(`[Waitlist] New signup: ${email}`);

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}