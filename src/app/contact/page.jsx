import { redirect } from "next/navigation";
import { sendDiscordWebhook } from "@/utils/discord/DiscordWebhook";
import { verifyHCaptcha } from "@/utils/hcaptcha/verifyHCaptcha";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

async function handleSubmit(formData) {
  "use server";
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const hcaptchaToken = formData.get("h-captcha-response");

  if (!name || !email || !message || !hcaptchaToken)
    throw new Error("Missing fields");

  const valid = await verifyHCaptcha(hcaptchaToken);
  if (!valid) throw new Error("Invalid hCaptcha verification");

  const content = `📩 **New Message Received**\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`;
  await sendDiscordWebhook(content);

  redirect("/contact/thank-you");
}

export default function Page() {
  return <ContactForm handleSubmit={handleSubmit} />;
}
