interface InvoiceStatusBadgeProps {
  status: "active" | "paid" | "canceled";
}

const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "bg-blue-100 text-blue-700",
  },
  paid: {
    label: "Paid",
    className: "bg-green-100 text-green-700",
  },
  canceled: {
    label: "Canceled",
    className: "bg-gray-100 text-gray-700",
  },
};

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}