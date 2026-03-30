import { DollarSign, Clock, FileText, TrendingUp } from "lucide-react";

interface PaymentMetricsProps {
  stats: {
    totalInvoices: number;
    totalCollected: number;
    averageDaysToPayment: number;
    activeInvoices: number;
  };
  tier: string;
}

export function PaymentMetrics({ stats, tier }: PaymentMetricsProps) {
  const metrics = [
    {
      label: "Total Invoices",
      value: stats.totalInvoices,
      icon: FileText,
      color: "blue",
    },
    {
      label: "Active Invoices",
      value: stats.activeInvoices,
      icon: Clock,
      color: "amber",
    },
    {
      label: "Total Collected",
      value: `$${stats.totalCollected.toLocaleString()}`,
      icon: DollarSign,
      color: "green",
    },
    {
      label: "Avg. Days to Payment",
      value: stats.averageDaysToPayment,
      icon: TrendingUp,
      color: "purple",
    },
  ];

  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    amber: { bg: "bg-amber-100", text: "text-amber-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const colors = colorMap[metric.color];

        return (
          <div
            key={metric.label}
            className="bg-white rounded-xl border p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <Icon className={`h-5 w-5 ${colors.text}`} />
              </div>
              <span className="text-sm text-gray-500">{metric.label}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {metric.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}