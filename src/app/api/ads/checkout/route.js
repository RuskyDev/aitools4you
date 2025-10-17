import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe/stripe-client";
import JSZip from "jszip";

export async function POST(req) {
  try {
    const body = await req.formData();
    const name = body.get("name");
    const email = body.get("email");
    const productName = body.get("productName");
    const productUrl = body.get("productUrl");
    const productDescription = body.get("productDescription");
    const adType = body.get("adType");
    const artworkOption = body.get("artworkOption");
    const file = body.get("bannerUpload");

    if (file && file.size > 300 * 1024)
      return NextResponse.json({ error: "Image too large (max 300KB)" }, { status: 400 });

    let zipBuffer = null;
    if (file && file.size > 0) {
      const zip = new JSZip();
      const fileBuffer = await file.arrayBuffer();
      zip.file(file.name, fileBuffer);
      zipBuffer = await zip.generateAsync({ type: "base64" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: adType },
            unit_amount: 8000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ads/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ads/cancel`,
      customer_email: email,
      metadata: {
        name,
        email,
        productName,
        productUrl,
        productDescription,
        adType,
        artworkOption,
        artworkZip: zipBuffer || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
