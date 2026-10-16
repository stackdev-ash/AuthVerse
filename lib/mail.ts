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

interface PasswordResetEmailProps {
  email: string;
  token: string;
}

export async function sendVerificationEmail({
  email,
  token,
}: VerificationEmailProps) {
  const baseUrl = (process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  const verificationLink = `${baseUrl}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

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


export async function sendPasswordResetEmail({
  email,
  token,
}: PasswordResetEmailProps) {
  const baseUrl = (process.env.AUTH_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
  const resetLink = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: `"AuthVerse" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your AuthVerse password",
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;max-width:560px;margin:auto">
        <h2>Reset your AuthVerse password</h2>
        <p>We received a request to reset the password for your account.</p>
        <p><a href="${resetLink}" style="display:inline-block;padding:12px 24px;background:#111;color:#fff;text-decoration:none;border-radius:8px">Reset Password</a></p>
        <p>This link expires in 30 minutes and can only be used once.</p>
        <p>If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}
