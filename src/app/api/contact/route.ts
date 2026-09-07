import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

type Body = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.contactEmail;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "GarageApp <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email not configured", hint: "mailto" },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `GarageApp contact: ${name}${company ? ` (${company})` : ""}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
