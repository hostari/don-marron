import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/libs/resend";

export async function POST(req: NextRequest) {
  const { to, subject, text, html, replyTo } = await req.json();

  if (!to || !subject || !text || !html) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    await sendEmail({ to, subject, text, html, replyTo });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
