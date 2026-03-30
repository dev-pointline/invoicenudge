"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";

export function MarkPaidButton({ invoiceId }: { invoiceId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleMarkPaid() {
    setLoading(true);

    const response = await fetch(`/api/invoices/${invoiceId}/mark-paid`, {
      method: "POST",
    });

    if (response.ok) {
      router.refresh();
    } else {
      alert("Failed to mark invoice as paid");
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleMarkPaid}
      disabled={loading}
      className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      Mark as Paid
    </button>
  );
}