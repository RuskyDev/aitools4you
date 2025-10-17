import { stripe } from "@/utils/stripe/stripe-client";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") 
    return NextResponse.json({ verified: true });
  else 
    return NextResponse.json({ verified: false });
}
