export async function verifyHCaptcha(token) {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) throw new Error("Missing HCAPTCHA_SECRET_KEY");

  const res = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = await res.json();
  return data.success === true;
}
