import nodemailer, { SendMailOptions } from "nodemailer";
import "dotenv/config";

export function createMailer() {
  return nodemailer.createTransport({
    host: String(process.env.MAILER_HOST),
    port: Number(process.env.MAILER_PORT),
    secure: true,
    auth: {
      user: String(process.env.MAILER_USER),
      pass: String(process.env.MAILER_PASSWORD),
    },
  });
}

export const mailerBaseOptions: SendMailOptions = {
  from: `ISeeUAP <${process.env.MAILER_USER}>`,
};
