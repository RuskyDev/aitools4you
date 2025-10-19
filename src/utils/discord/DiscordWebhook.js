export async function sendToWebhook(...lines) {
  const webhookUrl = process.env.DISCORD_LIVE_LOGGING_WEBHOOK_URL
  if (!webhookUrl) throw new Error("Missing DISCORD_LIVE_LOGGING_WEBHOOK_URL")

  const description = lines.filter(Boolean).join("\n")
  if (!description) return

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{ description }],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Webhook failed: ${res.status} ${text}`)
  }
}
