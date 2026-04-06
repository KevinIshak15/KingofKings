import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { insertContactSchema } from "@/lib/api-types";

const notifyTo =
  process.env.CONTACT_TO_EMAIL?.trim() ||
  process.env.ADMIN_EMAIL?.trim() ||
  process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim() ||
  "md.ragy@gmail.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { message: "Contact form is not configured. Set RESEND_API_KEY on the server." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  let data;
  try {
    data = insertContactSchema.parse(body);
  } catch (e) {
    if (e instanceof ZodError) {
      const first = e.issues[0];
      return NextResponse.json(
        { message: first?.message || "Invalid input", field: first?.path.join(".") },
        { status: 400 }
      );
    }
    throw e;
  }

  const from =
    process.env.RESEND_FROM?.trim() || "King of Kings <onboarding@resend.dev>";

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone?.trim() || "—")}</p>
    <p><strong>Inquiry:</strong> ${escapeHtml(data.inquiryType)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [notifyTo],
      reply_to: data.email,
      subject: `Website contact: ${data.inquiryType} — ${data.name}`,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[contact] Resend error:", res.status, errText);
    return NextResponse.json(
      { message: "Could not send message. Please try again or email us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
