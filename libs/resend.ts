import { Resend } from "resend";
import config from "@/config";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

type SendEmailProps = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
};

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendEmailProps) => {
  await resend.emails.send({
    from: config.mailgun.fromAdmin,
    to,
    reply_to: replyTo,
    subject,
    text,
    html,
  });
};
