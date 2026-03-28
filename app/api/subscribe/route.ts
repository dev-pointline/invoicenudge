import { NextResponse } from "next/server";

const TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = "invoicenudge_validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Log the signup (server console for now)
    console.log(`[Waitlist Signup] Email: ${email}, Name: ${name || "N/A"}, Time: ${new Date().toISOString()}`);

    // Send to telemetry endpoint (non-blocking)
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
    }).catch(() => null); // Non-blocking, ignore errors

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll email you when we launch.",
    });
  } catch (error) {
    console.error("[Waitlist Error]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}