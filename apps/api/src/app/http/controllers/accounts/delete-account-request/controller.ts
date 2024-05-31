import { Response } from "express";
import "dotenv/config";
import { findByEmail } from "@app/repositories/user.repository";
import { DeleteAccountRequest } from "./schema";
import Email from "@app/emails/Email";
import { getHtmlContentFrom } from "@app/http/services/email";

export const deleteAccountController = async (
  req: DeleteAccountRequest,
  res: Response
) => {
  try {
    const { email } = req.body;

    const user = await findByEmail(email);

    if (!user) return res.status(422).send({ message: "User not found" });

    const link = `${process.env.LANDING_URL}/delete-account/${user.id}`;

    const htmlContent = getHtmlContentFrom("delete-account", {
      link,
      name: user.name,
    });

    const sent = await Email.send(user, "Eliminar cuenta", htmlContent);

    if (!sent) throw new Error();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
