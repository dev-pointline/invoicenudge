import { NextResponse } from "next/server";

const TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = "3423ec18-518e-420c-aa6e-09aea84ebde3";

export async function POST(request: Request) {
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

    // Log the signup to telemetry (non-blocking)
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
    }).catch(() => null);

    console.log(`[WAITLIST SIGNUP] Email: ${email}, Name: ${name || "N/A"}`);

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll email you when beta access opens.",
    });
  } catch (error) {
    console.error("[SUBSCRIBE ERROR]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}