import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validations";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = forgotPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            parsed.error.issues[0]?.message ?? "Enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const email = parsed.data.email.trim();
    const user = await prisma.user.findUnique({ where: { email } });

    const genericMessage =
      "If an account with that email exists and can reset a password, a reset link will be sent shortly.";

    if (!user || !user.password) {
      return NextResponse.json({ success: true, message: genericMessage });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const expiry = new Date(Date.now() + 30 * 60 * 1000); // 30 min

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: expiry,
      },
    });

    try {
      await sendPasswordResetEmail({ email: user.email, token: rawToken });
    } catch (error) {
      // Invalidate token if delivery fails.
      await prisma.user.update({
        where: { id: user.id },
        data: { resetPasswordToken: null, resetPasswordTokenExpiry: null },
      });
      throw error;
    }

    return NextResponse.json({ success: true, message: genericMessage });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process the request right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
