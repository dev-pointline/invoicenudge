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
        { success: false, message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Log the signup to console for debugging
    console.log(`[Waitlist Signup] Email: ${email}, Name: ${name || "N/A"}`);

    // Send telemetry event to track the signup
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
    }).catch((err) => {
      // Non-blocking - don't fail the request if telemetry fails
      console.error("[Telemetry Error]", err);
    });

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll notify you when we launch.",
    });
  } catch (error) {
    console.error("[Subscribe Error]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}