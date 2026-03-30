"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  tier: "starter" | "pro" | "agency";
  email: string;
}

export function CheckoutButton({ tier, email }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, email }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      Upgrade
    </button>
  );
}