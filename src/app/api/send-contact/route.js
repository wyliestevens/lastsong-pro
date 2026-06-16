import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Contact form email delivery via Resend.
// Sends from noreply@lastsong.pro to admin@lastsong.pro.
// Reply-to is set to the submitter so replying from Gmail goes straight to them.

const FROM = "Last Song Contact <noreply@lastsong.pro>";
const TO = "admin@lastsong.pro";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const { name, email, church, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeChurch = escapeHtml(church || "N/A");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    const html = `
      <div style="font-family: Arial, sans-serif; color:#222; line-height:1.5; max-width:620px;">
        <h2 style="margin:0 0 16px 0;">New Contact from the Last Song Website</h2>
        <table style="border-collapse:collapse; width:100%;">
          <tr><td style="padding:6px 12px; background:#f6f4ef; font-weight:bold;">Name</td><td style="padding:6px 12px;">${safeName}</td></tr>
          <tr><td style="padding:6px 12px; background:#f6f4ef; font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding:6px 12px; background:#f6f4ef; font-weight:bold;">Church</td><td style="padding:6px 12px;">${safeChurch}</td></tr>
          <tr><td style="padding:6px 12px; background:#f6f4ef; font-weight:bold; vertical-align:top;">Message</td><td style="padding:6px 12px;">${safeMessage}</td></tr>
        </table>
        <p style="margin-top:20px; color:#666; font-size:12px;">Reply to this email to respond directly to ${safeName}.</p>
      </div>
    `;

    const text = [
      "New Contact from the Last Song Website",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Church: ${church || "N/A"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Contact from ${name} - Last Song Website`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}
