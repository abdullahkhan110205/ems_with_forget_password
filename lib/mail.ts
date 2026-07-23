import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  token: string
) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your EMS password",
    html: `
      <h2>Password Reset Request</h2>

      <p>You requested to reset your password.</p>

      <p>
        Click the link below:
      </p>

      <p>
        <a href="${resetUrl}">${resetUrl}</a>
      </p>

      <p>This link expires in 1 hour.</p>
    `,
  });
}