import { Response } from "express";
import { LoginUserRequest } from "./schema";
import { findByEmail } from "@app/repositories/user.repository";
import { sign } from "jsonwebtoken";

const APP_KEY = process.env.APP_KEY!;

export const forgotPasswordController = async (
  req: LoginUserRequest,
  res: Response
) => {
  const validated = req.body;

  try {
    const foundUser = await findByEmail(validated.email);

    if (!foundUser) {
      return res.status(404).json({ message: "No user with this email found" });
    }

    const token = sign({ id: foundUser.id, name: foundUser.email }, APP_KEY, {
      expiresIn: "1h",
    });

    //TODO: send token to user's inbox
    console.log(token);

    return res.status(200).json({
      message: `Email sent to ${foundUser.email}. Please check your inbox.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).send({ message: "Something went wrong", error });
  }
};
