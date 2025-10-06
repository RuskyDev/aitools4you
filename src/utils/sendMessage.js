"use server";

export async function sendMessage(email, name, message) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("Missing DISCORD_WEBHOOK_URL");

  const payload = {
    embeds: [
      {
        title: "📩 New Contact Form Message",
        color: 0x5865f2,
        fields: [
          { name: "Name", value: name || "N/A", inline: true },
          { name: "Email", value: email || "N/A", inline: true },
          { name: "Message", value: message || "N/A" }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`Discord webhook failed: ${res.statusText}`);
}
