import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = resetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            parsed.error.issues[0]?.message ?? "Invalid password details.",
        },
        { status: 400 },
      );
    }

    const token =
      typeof (body as { token?: unknown }).token === "string"
        ? (body as { token: string }).token
        : "";

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "This password reset link is invalid or has expired.",
        },
        { status: 400 },
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: { gt: new Date() },
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This password reset link is invalid or has expired. Request a new one.",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Password updated successfully. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to reset your password right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
