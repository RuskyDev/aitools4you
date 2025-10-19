import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe/stripe-client";
import { sendEmail } from "@/utils/email/client";
import { supabase } from "@/utils/supabase/client";

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch {
    return NextResponse.json(
      { error: "Webhook signature error" },
      { status: 400 }
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const meta = session.metadata;
  let permanentBannerUrl = "";

  if (meta.bannerUrl) {
    try {
      const tempPath = meta.bannerUrl.split("/").pop();
      const permanentFileName = `ad-banner-${Date.now()}-${tempPath}`;

      const { error: copyError } = await supabase.storage
        .from("Ad Banner Designs")
        .copy(`temp/${tempPath}`, permanentFileName);

      if (!copyError) {
        const { data: urlData } = supabase.storage
          .from("Ad Banner Designs")
          .getPublicUrl(permanentFileName);

        permanentBannerUrl = urlData.publicUrl;

        await supabase.storage
          .from("Ad Banner Designs")
          .remove([`temp/${tempPath}`]);
      } else {
        console.error("File copy error:", copyError);
      }
    } catch (fileError) {
      console.error("File move error:", fileError);
    }
  }

  const html = `
  <p><b>Name:</b> ${meta.name}</p>
  <p><b>Email:</b> ${meta.email}</p>
  <p><b>Product:</b> ${meta.productName}</p>
  <p><b>URL:</b> ${meta.productUrl}</p>
  <p><b>Ad Type:</b> ${meta.adType}</p>
  <p><b>Banner Design:</b> ${meta.adBannerDesign}</p>
  <p><b>Description:</b> ${meta.productDescription}</p>
  ${
    permanentBannerUrl
      ? `<p><b>Banner:</b> <a href="${permanentBannerUrl}" target="_blank">View Banner</a></p>`
      : ""
  }
  <hr>
  <p>Timestamp: ${new Date().toLocaleString()}</p>
`;

  await sendEmail({
    to: "iamayaanalee@gmail.com",
    subject: `New Ad Purchased`,
    html,
  });

  return NextResponse.json({ received: true });
}
