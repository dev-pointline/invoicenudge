import { polar } from "./client";

const PRODUCT_IDS = {
  starter: process.env.POLAR_STARTER_PRODUCT_ID!,
  pro: process.env.POLAR_PRO_PRODUCT_ID!,
  agency: process.env.POLAR_AGENCY_PRODUCT_ID!,
};

export async function createCheckoutSession(
  tier: "starter" | "pro" | "agency",
  customerEmail: string,
  successUrl: string
): Promise<string | null> {
  try {
    const checkout = await polar.checkouts.create({
      productId: PRODUCT_IDS[tier],
      successUrl,
      customerEmail,
    });

    return checkout.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return null;
  }
}