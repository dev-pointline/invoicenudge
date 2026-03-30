export const TIER_LIMITS = {
  free: { invoicesPerMonth: 3, autopilot: false },
  starter: { invoicesPerMonth: 10, autopilot: false },
  pro: { invoicesPerMonth: 50, autopilot: true },
  agency: { invoicesPerMonth: Infinity, autopilot: true },
};