import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe/stripe-client";

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const webhookUrl = process.env.DISCORD_PRODUCT_PURCHASE_WEBHOOK_URL;

  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: "Webhook signature error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = session.metadata;
    const form = new FormData();

    form.append(
      "payload_json",
      JSON.stringify({
        content: "<@969507085316399154>",
        allowed_mentions: { users: ["969507085316399154"] },
        embeds: [
          {
            title: "✅ Ad Payment Completed",
            color: 0x00ff00,
            fields: [
              { name: "Name", value: meta.name },
              { name: "Email", value: meta.email },
              { name: "Product", value: meta.productName },
              { name: "URL", value: meta.productUrl },
              { name: "Ad Type", value: meta.adType },
              { name: "Artwork", value: meta.artworkOption },
              { name: "Description", value: meta.productDescription },
            ],
            timestamp: new Date(),
          },
        ],
      })
    );

    if (meta.artworkZip) {
      const buffer = Buffer.from(meta.artworkZip, "base64");
      form.append("files[0]", new Blob([buffer]), "artwork.zip");
    }

    await fetch(webhookUrl, { method: "POST", body: form });
  }

  return NextResponse.json({ received: true });
}
