import { NextResponse } from "next/server";
import { getResendClient, EMAIL_FROM, BOOKING_NOTIFICATION_EMAIL } from "@/lib/resend";

interface ContactPayload {
  name: string;
  phone: string;
  message: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

  if (!body.name || !body.phone || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resend = getResendClient();

  if (!resend || !BOOKING_NOTIFICATION_EMAIL) {
    console.log("[contact] Resend not configured — skipping email send.", body);
    return NextResponse.json({ ok: true, emailSent: false });
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: BOOKING_NOTIFICATION_EMAIL,
      subject: `New Contact Message — ${body.name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });
    return NextResponse.json({ ok: true, emailSent: true });
  } catch (error) {
    console.error("[contact] Resend send failed", error);
    return NextResponse.json({ ok: true, emailSent: false });
  }
}
