import { createClient } from "@/lib/supabase/server";
import { getPolarCheckoutUrl, POLAR_PRODUCTS } from "@/lib/polar";
import { User, CreditCard, Bell } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const currentPlan = profile?.plan || "free";

  return (
    <div className="p-6 lg:p-8 pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-medium">Settings</h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Manage your account and preferences.
          </p>
        </div>

        {/* Profile Section */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User size={18} style={{ color: "hsl(var(--accent))" }} />
            <h2 className="font-medium">Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="input-field bg-[var(--bg-secondary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Full name</label>
              <input
                type="text"
                defaultValue={profile?.full_name || ""}
                placeholder="Jane Doe"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Tone Preference */}
        <div className="card mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell size={18} style={{ color: "hsl(var(--accent))" }} />
            <h2 className="font-medium">Reminder Tone</h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Choose how your AI-generated reminders should sound.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <label className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              profile?.tone_preference === "casual" ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-light))]" : "border-[var(--border)] hover:border-[var(--text-tertiary)]"
            }`}>
              <input type="radio" name="tone" value="casual" defaultChecked={profile?.tone_preference === "casual"} className="sr-only" />
              <p className="font-medium text-sm">Casual</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">&ldquo;Hey! Just checking in about...&rdquo;</p>
            </label>
            <label className={`p-4 rounded-lg border cursor-pointer transition-colors ${
              profile?.tone_preference === "formal" ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent-light))]" : "border-[var(--border)] hover:border-[var(--text-tertiary)]"
            }`}>
              <input type="radio" name="tone" value="formal" defaultChecked={profile?.tone_preference === "formal"} className="sr-only" />
              <p className="font-medium text-sm">Formal</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">&ldquo;I hope this message finds you well...&rdquo;</p>
            </label>
          </div>
        </div>

        {/* Billing Section */}
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard size={18} style={{ color: "hsl(var(--accent))" }} />
            <h2 className="font-medium">Billing</h2>
          </div>
          <div className="p-4 rounded-lg bg-[var(--bg-secondary)] mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Current plan</p>
                <p className="text-sm text-[var(--text-tertiary)]">
                  {currentPlan === "free" ? "Free" : currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                </p>
              </div>
              {currentPlan === "free" && (
                <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-600">
                  Limited to 3 invoices
                </span>
              )}
            </div>
          </div>

          {currentPlan === "free" && (
            <div className="space-y-3">
              <p className="text-sm text-[var(--text-secondary)]">Upgrade to unlock more features:</p>
              <a
                href={getPolarCheckoutUrl(POLAR_PRODUCTS.starter.id, user?.email)}
                className="btn-primary w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                Upgrade to Starter — $19/month
              </a>
              <a
                href={getPolarCheckoutUrl(POLAR_PRODUCTS.pro.id, user?.email)}
                className="btn-secondary w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                Upgrade to Pro — $49/month
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}