import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/verify-email?error=missing-token", request.url)
    );
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      verificationToken: hashedToken,
    },
  });

  if (!user) {
    return NextResponse.redirect(
      new URL("/verify-email?error=invalid-token", request.url)
    );
  }

  if (
    !user.verificationTokenExpiry ||
    user.verificationTokenExpiry < new Date()
  ) {
    return NextResponse.redirect(
      new URL("/verify-email?error=expired-token", request.url)
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),

      verificationToken: null,
      verificationTokenExpiry: null,
    },
  });

  return NextResponse.redirect(
    new URL("/login?verified=true", request.url)
  );
}