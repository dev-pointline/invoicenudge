import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("webhook-signature") || "";

    // In production, verify signature using POLAR_WEBHOOK_SECRET
    // For MVP, we'll parse and handle directly
    
    let event;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const eventType = event.type;

    switch (eventType) {
      case "order.paid": {
        const customerEmail = event.data?.customer_email;
        const productId = event.data?.product_id;
        const polarCustomerId = event.data?.customer_id;

        if (!customerEmail) {
          console.error("No customer email in order.paid event");
          break;
        }

        // Determine plan from product ID
        let plan = "starter";
        const starterProductId = process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID;
        const proProductId = process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID;
        const agencyProductId = process.env.NEXT_PUBLIC_POLAR_AGENCY_PRODUCT_ID;

        if (productId === proProductId) {
          plan = "pro";
        } else if (productId === agencyProductId) {
          plan = "agency";
        }

        // Update user profile with plan
        const { error } = await supabaseAdmin
          .from("profiles")
          .update({ 
            plan, 
            polar_customer_id: polarCustomerId,
            updated_at: new Date().toISOString()
          })
          .eq("email", customerEmail.toLowerCase());

        if (error) {
          console.error("Failed to update profile:", error);
        } else {
          console.log(`User ${customerEmail} upgraded to ${plan}`);
        }
        break;
      }

      case "subscription.created": {
        console.log("Subscription created:", event.data);
        break;
      }

      case "subscription.updated": {
        console.log("Subscription updated:", event.data);
        break;
      }

      case "subscription.canceled": {
        const customerEmail = event.data?.customer_email;
        if (customerEmail) {
          // Downgrade to free plan
          await supabaseAdmin
            .from("profiles")
            .update({ plan: "free", updated_at: new Date().toISOString() })
            .eq("email", customerEmail.toLowerCase());
          console.log(`User ${customerEmail} downgraded to free`);
        }
        break;
      }

      default:
        console.log("Unhandled event type:", eventType);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}