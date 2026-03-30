"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface PreviewModeToggleProps {
  enabled: boolean;
  userId: string;
}

export function PreviewModeToggle({ enabled, userId }: PreviewModeToggleProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleToggle() {
    setLoading(true);
    const newValue = !isEnabled;

    const { error } = await supabase
      .from("profiles")
      .update({ preview_mode: newValue })
      .eq("id", userId);

    if (error) {
      console.error("Failed to update preview mode:", error);
    } else {
      setIsEnabled(newValue);
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        isEnabled ? "bg-primary-600" : "bg-gray-300"
      } ${loading ? "opacity-50" : ""}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isEnabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}