import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    
    if (!user) {
      return NextResponse.json({
        message: "If that email exists, a reset link has been sent.",
      });
    }

    
    if (!user.password) {
      return NextResponse.json({
        message: "This account uses social login.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    //await sendPasswordResetEmail(email, token);

    try {
      await sendPasswordResetEmail(email, token);
      console.log("Password reset email sent successfully.");
    } catch (error) {
      console.error("Failed to send password reset email:");
      console.error(error);

      return NextResponse.json(
        { message: "Failed to send password reset email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "If that email exists, a reset link has been sent.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}