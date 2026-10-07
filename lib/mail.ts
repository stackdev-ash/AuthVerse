import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface VerificationEmailProps {
  email: string;
  token: string;
}

export async function sendVerificationEmail({
  email,
  token,
}: VerificationEmailProps) {
  const verificationLink =
    `http://localhost:3000/api/auth/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"AuthVerse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",

    html: `
      <h2>Welcome to AuthVerse!</h2>

      <p>Click the button below to verify your email.</p>

      <a
        href="${verificationLink}"
        style="
          display:inline-block;
          padding:12px 24px;
          background:#000;
          color:#fff;
          text-decoration:none;
          border-radius:8px;
        "
      >
        Verify Email
      </a>

      <p>This link expires in 1 hour.</p>
    `,
  });
}