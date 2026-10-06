import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = signupSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { email } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists.",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const rawVerificationToken = crypto.randomBytes(32).toString("hex");
    const verificationToken = crypto
      .createHash("sha256")
      .update(rawVerificationToken)
      .digest("hex");
    const verificationTokenExpiry = new Date(Date.now() + 1000 * 60 * 60);

    const user = await prisma.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,

        verificationToken,
        verificationTokenExpiry,
      },
    });

    await sendVerificationEmail({
      email: user.email,
      token: rawVerificationToken,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully. Please check your email to verify your account.",
        user: {
          id: user.id,
          email: user.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
