import { Resend } from "resend";

let client: Resend | null = null;

/**
 * Lazily creates the Resend client only when RESEND_API_KEY is configured.
 * Callers must handle a null return by skipping the send (see api routes) —
 * this keeps the app fully functional before an API key is ever added.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL ?? "WASH DAY <onboarding@resend.dev>";
export const BOOKING_NOTIFICATION_EMAIL = process.env.BOOKING_NOTIFICATION_EMAIL ?? "";
