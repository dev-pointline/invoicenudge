import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSubscriptionForUser } from "@/lib/subscriptions/queries";
import { TIER_LIMITS, TIER_PRICES } from "@/lib/subscriptions/limits";
import { PreviewModeToggle } from "@/components/PreviewModeToggle";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Check } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [subscription, profileResult] = await Promise.all([
    getSubscriptionForUser(user.id),
    supabase.from("profiles").select("preview_mode").eq("id", user.id).single(),
  ]);

  const previewMode = profileResult.data?.preview_mode ?? true;
  const currentTier = subscription?.tier ?? "free";

  const tiers = [
    {
      id: "free",
      name: "Free",
      price: 0,
      invoices: TIER_LIMITS.free,
      features: ["5 invoices/month", "Preview Mode only", "Email support"],
    },
    {
      id: "starter",
      name: "Starter",
      price: TIER_PRICES.starter,
      invoices: TIER_LIMITS.starter,
      features: [
        "10 invoices/month",
        "Preview + Autopilot Mode",
        "Payment dashboard",
        "Priority support",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: TIER_PRICES.pro,
      invoices: TIER_LIMITS.pro,
      features: [
        "30 invoices/month",
        "Everything in Starter",
        "Advanced analytics",
        "Custom reminder timing",
      ],
    },
    {
      id: "agency",
      name: "Agency",
      price: TIER_PRICES.agency,
      invoices: TIER_LIMITS.agency,
      features: [
        "100 invoices/month",
        "Everything in Pro",
        "Multiple brands",
        "Dedicated support",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-8">Manage your account and subscription</p>

      <div className="bg-white rounded-xl border p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Preview Mode
        </h2>
        <p className="text-gray-600 mb-4">
          When enabled, you&apos;ll approve each reminder before it&apos;s sent. Turn off
          for full automation.
        </p>
        <PreviewModeToggle enabled={previewMode} userId={user.id} />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Subscription Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-xl border p-6 ${
                currentTier === tier.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h3 className="font-semibold text-gray-900">{tier.name}</h3>
              <p className="text-2xl font-bold text-gray-900 my-2">
                ${tier.price}
                <span className="text-sm font-normal text-gray-500">/mo</span>
              </p>
              <ul className="space-y-2 mb-4">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              {currentTier === tier.id ? (
                <span className="block text-center text-sm font-medium text-primary-600">
                  Current plan
                </span>
              ) : tier.id !== "free" ? (
                <CheckoutButton
                  tier={tier.id as "starter" | "pro" | "agency"}
                  email={user.email!}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Forward Address</p>
            <code className="text-sm font-mono text-primary-700">
              followup+{user.id}@invoicenudge.com
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}