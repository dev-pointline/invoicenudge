import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Subscription } from "@/lib/invoices/types";

export async function getSubscriptionForUser(
  userId: string
): Promise<Subscription | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    // No subscription found is not an error
    if (error.code === "PGRST116") return null;
    console.error("Error fetching subscription:", error);
    return null;
  }

  return data;
}

export async function upsertSubscription(data: {
  userId: string;
  polarSubscriptionId: string;
  polarCustomerId: string;
  tier: string;
  status: string;
  currentPeriodEnd: string | null;
}): Promise<boolean> {
  const admin = createAdminClient();

  const { error } = await admin.from("subscriptions").upsert(
    {
      user_id: data.userId,
      polar_subscription_id: data.polarSubscriptionId,
      polar_customer_id: data.polarCustomerId,
      tier: data.tier,
      status: data.status,
      current_period_end: data.currentPeriodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Error upserting subscription:", error);
    return false;
  }

  return true;
}