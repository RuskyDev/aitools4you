export async function sendDiscordWebhook(content, webhookOption = "1") {
  let url;
  if (webhookOption === "1") url = process.env.DISCORD_WEBHOOK_URL_1;
  else if (webhookOption === "2") url = process.env.DISCORD_WEBHOOK_URL_2;
  else throw new Error("Invalid webhook option");

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
}
