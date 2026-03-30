import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/invoices/types";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;
  return mapProfileFromDb(data);
}

export async function getProfileByEmail(email: string): Promise<Profile | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (error) return null;
  return mapProfileFromDb(data);
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, "displayName" | "autopilotEnabled" | "tonePreference" | "reminderSchedule">>
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: updates.displayName,
      autopilot_enabled: updates.autopilotEnabled,
      tone_preference: updates.tonePreference,
      reminder_schedule: updates.reminderSchedule,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw error;
}

export async function updateSubscription(
  userId: string,
  tier: Profile["subscriptionTier"],
  polarCustomerId?: string,
  polarSubscriptionId?: string
): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      subscription_tier: tier,
      polar_customer_id: polarCustomerId,
      polar_subscription_id: polarSubscriptionId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw error;
}

function mapProfileFromDb(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    email: row.email as string,
    displayName: row.display_name as string | null,
    subscriptionTier: row.subscription_tier as Profile["subscriptionTier"],
    polarCustomerId: row.polar_customer_id as string | null,
    polarSubscriptionId: row.polar_subscription_id as string | null,
    autopilotEnabled: row.autopilot_enabled as boolean,
    reminderSchedule: row.reminder_schedule as number[],
    tonePreference: row.tone_preference as Profile["tonePreference"],
    invoicesThisMonth: row.invoices_this_month as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}