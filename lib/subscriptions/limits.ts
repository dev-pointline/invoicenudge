import { Subscription } from "@/lib/invoices/types";

export const TIER_LIMITS = {
  free: 5,
  starter: 10,
  pro: 30,
  agency: 100,
} as const;

export const TIER_PRICES = {
  free: 0,
  starter: 19,
  pro: 49,
  agency: 149,
} as const;

export function getInvoiceLimit(subscription: Subscription | null): number {
  const tier = subscription?.tier ?? "free";
  return TIER_LIMITS[tier as keyof typeof TIER_LIMITS] ?? TIER_LIMITS.free;
}

export function isWithinLimit(
  subscription: Subscription | null,
  currentCount: number
): boolean {
  const limit = getInvoiceLimit(subscription);
  return currentCount < limit;
}

export function getRemainingInvoices(
  subscription: Subscription | null,
  currentCount: number
): number {
  const limit = getInvoiceLimit(subscription);
  return Math.max(0, limit - currentCount);
}