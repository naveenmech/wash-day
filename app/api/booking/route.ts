import { NextResponse } from "next/server";
import { getResendClient, EMAIL_FROM, BOOKING_NOTIFICATION_EMAIL } from "@/lib/resend";
import type { CartItem } from "@/types";

interface BookingPayload {
  name: string;
  phone: string;
  address: string;
  pickupDate: string;
  pickupTime: string;
  notes?: string;
  items: CartItem[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<BookingPayload>;

  if (!body.name || !body.phone || !body.address || !body.pickupDate || !body.pickupTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const items = body.items ?? [];
  const itemsSummary = items
    .map((item) => `${item.name} x${item.quantity} (₹${item.price}/${item.unit})`)
    .join("<br/>");

  const resend = getResendClient();

  if (!resend || !BOOKING_NOTIFICATION_EMAIL) {
    console.log("[booking] Resend not configured — skipping email send.", {
      name: body.name,
      phone: body.phone,
      items,
    });
    return NextResponse.json({ ok: true, emailSent: false });
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: BOOKING_NOTIFICATION_EMAIL,
      subject: `New Pickup Booking — ${body.name}`,
      html: `
        <h2>New Laundry Pickup Booking</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Address:</strong> ${body.address}</p>
        <p><strong>Pickup:</strong> ${body.pickupDate} — ${body.pickupTime}</p>
        ${body.notes ? `<p><strong>Notes:</strong> ${body.notes}</p>` : ""}
        <p><strong>Services:</strong></p>
        <p>${itemsSummary || "No services selected"}</p>
      `,
    });
    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("[booking] Resend send failed", error);
    return NextResponse.json({ ok: true, emailSent: false });
  }
}
