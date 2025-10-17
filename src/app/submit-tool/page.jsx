import { redirect } from "next/navigation";
import { sendDiscordWebhook } from "@/utils/discord/DiscordWebhook";
import { verifyHCaptcha } from "@/utils/hcaptcha/verifyHCaptcha";
import ProductSubmissionForm from "./ProductSubmissionForm";

export const dynamic = "force-dynamic";

async function handleSubmit(formData) {
  "use server";

  const productName = formData.get("productName");
  const productURL = formData.get("productURL");
  const pricing = formData.get("pricing");
  const shortDescription = formData.get("shortDescription");
  const longDescription = formData.get("longDescription");
  const tags = formData.get("tags");
  const submitterName = formData.get("submitterName");
  const submitterEmail = formData.get("submitterEmail");
  const uniqueness = formData.get("uniqueness");
  const hcaptchaToken = formData.get("h-captcha-response");

  if (!productName || !productURL || !submitterName || !submitterEmail || !hcaptchaToken) {
    throw new Error("Missing required fields");
  }

  const valid = await verifyHCaptcha(hcaptchaToken);
  if (!valid) throw new Error("Invalid hCaptcha verification");

  const content = `
📢 **New AI Tool Submission**

**Product Name:** ${productName}
**Website:** ${productURL}
**Pricing:** ${pricing || "N/A"}
**Short Description:** ${shortDescription}
**Long Description:** ${longDescription}
**Tags:** ${tags || "N/A"}
**Submitted By:** ${submitterName} (${submitterEmail})
**What Makes It Unique:** ${uniqueness || "N/A"}
`;

  await sendDiscordWebhook(content, "2");

  redirect("/contact/thank-you");
}

export default function Page() {
  return <ProductSubmissionForm handleSubmit={handleSubmit} />;
}
