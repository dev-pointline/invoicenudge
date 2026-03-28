import { NextRequest, NextResponse } from "next/server";

const TELEMETRY_BASE_URL = "https://hooks.pointline.dev";
const TELEMETRY_TOKEN = "plTok_01JQAQ0YAC3D1N1JK68BCYRV8W";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

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

    // Send waitlist signup event to telemetry
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
          product: "invoicenudge",
          timestamp: new Date().toISOString(),
        },
      }),
    }).catch(() => null); // non-blocking

    console.log(`[Waitlist Signup] Email: ${email}, Name: ${name || "N/A"}`);

    return NextResponse.json({
      success: true,
      message: "You're on the waitlist! We'll notify you when we launch.",
    });
  } catch (error) {
    console.error("[Waitlist Error]", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}