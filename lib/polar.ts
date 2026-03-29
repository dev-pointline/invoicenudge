export function getPolarCheckoutUrl(productId: string, customerEmail?: string) {
  const params = new URLSearchParams({
    product_id: productId,
  });
  
  if (customerEmail) {
    params.set("customer_email", customerEmail);
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://invoicenudge.pointline.dev";
  params.set("success_url", `${siteUrl}/thank-you?checkout=success`);
  params.set("cancel_url", siteUrl);
  
  return `https://polar.sh/checkout?${params.toString()}`;
}

export const POLAR_PRODUCTS = {
  starter: {
    id: process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID || "",
    name: "Starter",
    price: 19,
  },
  pro: {
    id: process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID || "",
    name: "Pro",
    price: 49,
  },
  agency: {
    id: process.env.NEXT_PUBLIC_POLAR_AGENCY_PRODUCT_ID || "",
    name: "Agency",
    price: 149,
  },
};