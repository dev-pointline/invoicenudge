import { NextResponse } from "next/server";
import { updateSubscription, getProfileByEmail } from "@/lib/profiles/queries";
import type { Profile } from "@/lib/invoices/types";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { type, data } = payload;

    if (type === "checkout.completed" || type === "subscription.created") {
      const customerEmail = data.customer?.email;
      if (!customerEmail) {
        return NextResponse.json({ error: "No customer email" }, { status: 400 });
      }

      const profile = await getProfileByEmail(customerEmail);
      if (!profile) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Determine tier from product name or metadata
      const productName = data.product?.name?.toLowerCase() || "";
      let tier: Profile["subscriptionTier"] = "starter";
      if (productName.includes("pro")) tier = "pro";
      if (productName.includes("agency")) tier = "agency";

      await updateSubscription(
        profile.id,
        tier,
        data.customer?.id,
        data.subscription?.id
      );
    }

    if (type === "subscription.canceled") {
      const customerEmail = data.customer?.email;
      if (customerEmail) {
        const profile = await getProfileByEmail(customerEmail);
        if (profile) {
          await updateSubscription(profile.id, "free");
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Polar webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}