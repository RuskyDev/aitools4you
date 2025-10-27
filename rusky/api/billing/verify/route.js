import { stripe } from "@/utils/stripe/client";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sid = searchParams.get("sid");
  const session = await stripe.checkout.sessions.retrieve(sid);

  if (session.payment_status === "paid") 
    return NextResponse.json({ verified: true });
  else 
    return NextResponse.json({ verified: false });
}