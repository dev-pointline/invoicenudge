import { Reminder } from "@/lib/invoices/types";
import { format } from "date-fns";
import { Check, Clock, Send, XCircle } from "lucide-react";

interface ReminderTimelineProps {
  reminders: Reminder[];
}

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    label: "Pending approval",
    color: "text-amber-500",
    bg: "bg-amber-100",
  },
  approved: {
    icon: Clock,
    label: "Scheduled",
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  sent: {
    icon: Send,
    label: "Sent",
    color: "text-green-500",
    bg: "bg-green-100",
  },
  skipped: {
    icon: XCircle,
    label: "Skipped",
    color: "text-gray-400",
    bg: "bg-gray-100",
  },
};

const REMINDER_LABELS = {
  1: "Due date reminder",
  2: "7-day follow-up",
  3: "14-day follow-up",
  4: "Final notice (21 days)",
};

export function ReminderTimeline({ reminders }: ReminderTimelineProps) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="space-y-6">
        {reminders.map((reminder, index) => {
          const config = STATUS_CONFIG[reminder.status];
          const Icon = config.icon;
          const isLast = index === reminders.length - 1;

          return (
            <div key={reminder.id} className="relative flex gap-4">
              {!isLast && (
                <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gray-200" />
              )}

              <div className={`p-2 rounded-full ${config.bg} z-10`}>
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>

              <div className="flex-1 pb-6">
                <p className="font-medium text-gray-900">
                  {REMINDER_LABELS[reminder.reminder_number as keyof typeof REMINDER_LABELS]}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(reminder.scheduled_date), "MMM d, yyyy")} •{" "}
                  {config.label}
                </p>
                {reminder.sent_at && (
                  <p className="text-xs text-gray-400 mt-1">
                    Sent at {format(new Date(reminder.sent_at), "h:mm a")}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}