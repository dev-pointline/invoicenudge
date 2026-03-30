import { createHmac, timingSafeEqual } from "crypto";

export function verifyPolarWebhook(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export interface PolarWebhookEvent {
  type: string;
  data: {
    id: string;
    customer_id: string;
    product: {
      name: string;
      metadata?: Record<string, string>;
    };
    status: string;
    current_period_end?: string;
    customer?: {
      email: string;
    };
  };
}

export function parseWebhookEvent(payload: string): PolarWebhookEvent | null {
  try {
    return JSON.parse(payload);
  } catch {
    return null;
  }
}