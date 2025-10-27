import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/email/client";
import { verifyHCaptcha } from "@/utils/hcaptcha/verifyHCaptcha";

function escapeHTML(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req) {
  const body = await req.json();
  const { type, hcaptchaToken } = body;

  if (!type || !hcaptchaToken) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const isHuman = await verifyHCaptcha(hcaptchaToken);
  if (!isHuman) {
    return NextResponse.json({ message: "HCaptcha verification failed" }, { status: 403 });
  }

  try {
    let to = "iamayaanalee@gmail.com";
    let subject = "";
    let html = "";

    if (type === "contact") {
      const { name, email, message } = body;
      if (!name || !email || !message) {
        return NextResponse.json({ message: "Missing contact fields" }, { status: 400 });
      }
      subject = `New Contact Form Submission from ${escapeHTML(name)}`;
      html = `
        <p><strong>Name:</strong> ${escapeHTML(name)}</p>
        <p><strong>Email:</strong> ${escapeHTML(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHTML(message)}</p>
      `;
    } else if (type === "ai-tool-submission") {
      const { submitterName, submitterEmail, productName, productURL, shortDescription } = body;
      if (!submitterName || !submitterEmail || !productName || !productURL || !shortDescription) {
        return NextResponse.json({ message: "Missing AI tool submission fields" }, { status: 400 });
      }
      subject = `New AI Tool Submission from ${escapeHTML(submitterName)}`;
      html = `
        <p><strong>Name:</strong> ${escapeHTML(submitterName)}</p>
        <p><strong>Email:</strong> ${escapeHTML(submitterEmail)}</p>
        <p><strong>Product Name:</strong> ${escapeHTML(productName)}</p>
        <p><strong>Product URL:</strong> <a href="${escapeHTML(productURL)}">${escapeHTML(productURL)}</a></p>
        <p><strong>Description:</strong> ${escapeHTML(shortDescription)}</p>
      `;
    } else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    await sendEmail({ to, subject, html });
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send email", error: error.message }, { status: 500 });
  }
}
