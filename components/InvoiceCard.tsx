import { Invoice } from "@/lib/invoices/types";
import { InvoiceStatusBadge } from "./InvoiceStatusBadge";
import { format } from "date-fns";
import { DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  return (
    <Link
      href={`/invoices/${invoice.id}`}
      className="block bg-white rounded-xl border p-6 hover:border-primary-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{invoice.client_name}</h3>
          <p className="text-sm text-gray-500">{invoice.client_email}</p>
        </div>
        <InvoiceStatusBadge status={invoice.status} />
      </div>

      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="h-4 w-4" />
          {invoice.amount
            ? `${invoice.currency} ${invoice.amount.toLocaleString()}`
            : "—"}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          Due {format(new Date(invoice.due_date), "MMM d, yyyy")}
        </div>
      </div>
    </Link>
  );
}