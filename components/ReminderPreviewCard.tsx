"use client";

import { useState } from "react";
import { Reminder } from "@/lib/invoices/types";
import { format } from "date-fns";
import { Check, Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReminderPreviewCardProps {
  reminder: Reminder;
  clientName: string;
}

export function ReminderPreviewCard({
  reminder,
  clientName,
}: ReminderPreviewCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleApprove() {
    setLoading(true);

    const response = await fetch(`/api/invoices/${reminder.invoice_id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reminderId: reminder.id }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      alert("Failed to approve reminder");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Reminder #{reminder.reminder_number} •{" "}
          {format(new Date(reminder.scheduled_date), "MMM d")}
        </span>
      </div>

      {reminder.subject && reminder.body ? (
        <>
          <p className="font-medium text-gray-900 mb-2">{reminder.subject}</p>
          <p className="text-gray-600 text-sm whitespace-pre-wrap mb-4">
            {reminder.body}
          </p>
        </>
      ) : (
        <p className="text-gray-500 text-sm italic mb-4">
          AI will generate this reminder when scheduled
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Approve
        </button>
        <button className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          <Edit className="h-4 w-4" />
          Edit
        </button>
      </div>
    </div>
  );
}