import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  const uniqueSubject = `${subject} - ${Date.now()}`;
  await transporter.sendMail({
    from: `"AI Tools 4 You" <${process.env.SMTP_USER}>`,
    to,
    subject: uniqueSubject,
    html,
    headers: {
      "In-Reply-To": "",
      References: "",
    },
  });
}
