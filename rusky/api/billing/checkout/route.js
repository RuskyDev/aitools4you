import { NextResponse } from "next/server";
import { stripe } from "@/utils/stripe/client";
import { supabase } from "@/utils/supabase/client";
import { verifyHCaptcha } from "@/utils/hcaptcha/verifyHCaptcha";

export async function POST(req) {
  try {
    const body = await req.formData();
    const name = body.get("name");
    const email = body.get("email");
    const productName = body.get("productName");
    const productUrl = body.get("productUrl");
    const productDescription = body.get("productDescription");
    const adType = body.get("adType");
    const adBannerDesign = body.get("adBannerDesign"); // Changed from artworkOption
    const file = body.get("bannerUpload");
    const captchaToken = body.get("hCaptchaToken");

    if (!captchaToken)
      return NextResponse.json({ error: "hCaptcha token missing" }, { status: 400 });

    const validCaptcha = await verifyHCaptcha(captchaToken);
    if (!validCaptcha)
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 });

    let publicUrl = "";

    if (file && file.size > 0 && adBannerDesign === "upload" && adType !== "Featured Advertising Banner") {
      if (file.size > 1024 * 1024)
        return NextResponse.json({ error: "Image too large (max 1MB)" }, { status: 400 });

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileExt = file.name.split(".").pop();
      const path = `temp/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("Ad Banner Designs")
        .upload(path, buffer, { contentType: file.type, upsert: false });

      if (uploadError)
        return NextResponse.json({ error: "Upload failed: " + uploadError.message }, { status: 500 });

      const { data } = supabase.storage
        .from("Ad Banner Designs")
        .getPublicUrl(path);

      publicUrl = data.publicUrl;
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ads/success?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ads/cancel`,
      customer_email: email,
      metadata: {
        name,
        email,
        productName,
        productUrl,
        productDescription,
        adType,
        adBannerDesign,
        bannerUrl: publicUrl,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}