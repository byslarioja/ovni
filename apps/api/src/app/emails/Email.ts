import { User } from "@app/entities/User";
import { createMailer, mailerBaseOptions } from "@config/email";
import { Transporter, SendMailOptions } from "nodemailer";

class Email {
  private static transporter: Transporter = createMailer();

  static async send(
    user: User,
    subject: string,
    html: string
  ): Promise<boolean> {
    const mailOptions: SendMailOptions = {
      ...mailerBaseOptions,
      to: user.email,
      subject,
      html,
    };

    try {
      let info = await this.transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);

      return true;
    } catch (error) {
      console.log("Error occurred while sending email: ", error);

      return false;
    }
  }
}

export default Email;
