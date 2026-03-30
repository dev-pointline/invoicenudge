import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  verifyPolarWebhook,
  parseWebhookEvent,
} from "@/lib/polar/webhooks";

const TIER_MAP: Record<string, string> = {
  "InvoiceNudge Starter": "starter",
  "InvoiceNudge Pro": "pro",
  "InvoiceNudge Agency": "agency",
};

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("polar-signature") ?? "";

    if (!verifyPolarWebhook(payload, signature, process.env.POLAR_WEBHOOK_SECRET!)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = parseWebhookEvent(payload);
    if (!event) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Get user by email
    const customerEmail = event.data.customer?.email;
    if (!customerEmail) {
      return NextResponse.json({ received: true });
    }

    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", customerEmail)
      .single();

    if (!profile) {
      console.log("No profile found for email:", customerEmail);
      return NextResponse.json({ received: true });
    }

    const tier = TIER_MAP[event.data.product.name] ?? "free";

    if (
      event.type === "subscription.created" ||
      event.type === "subscription.updated"
    ) {
      await admin.from("subscriptions").upsert(
        {
          user_id: profile.id,
          polar_subscription_id: event.data.id,
          polar_customer_id: event.data.customer_id,
          tier,
          status: event.data.status === "active" ? "active" : "canceled",
          current_period_end: event.data.current_period_end ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
    } else if (event.type === "subscription.canceled") {
      await admin
        .from("subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("polar_subscription_id", event.data.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Polar webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}