"use server"
import { headers } from "next/headers"
import { sendToWebhook } from "@/lib/sendToWebhook"

export async function logPageView(pathname, userTime, timeZone) {
  const hdrs = headers()

  const ip =
    hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    hdrs.get("x-real-ip") ||
    "Unknown IP"

  const ua = hdrs.get("user-agent") || "Unknown User-Agent"
  const referer = hdrs.get("referer") || "No referrer"
  const country = hdrs.get("x-vercel-ip-country") || "Unknown Country"
  const region = hdrs.get("x-vercel-ip-region") || "Unknown Region"
  const city = hdrs.get("x-vercel-ip-city") || "Unknown City"

  const serverTime = new Date().toISOString()

  await sendToWebhook(
    "New Page View",
    `URL: ${pathname}`,
    `Referer: ${referer}`,
    `IP: ${ip}`,
    `Country: ${country}`,
    `Region: ${region}`,
    `City: ${city}`,
    `User-Agent: ${ua}`,
    `User Local Time: ${userTime || "Unknown"}`,
    `User Time Zone: ${timeZone || "Unknown"}`,
    `Server Time: ${serverTime}`
  )
}
