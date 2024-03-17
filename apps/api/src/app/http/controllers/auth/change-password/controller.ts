import { Response } from "express";
import { ChangePasswordRequest } from "./schema";
import { updateUser } from "@app/repositories/user.repository";
import bcrypt from "bcrypt";

export const changePasswordController = async (
  req: ChangePasswordRequest,
  res: Response
) => {
  const { token, password } = req.body;

  try {
    const newEncryptedPassword = await bcrypt.hash(password, 10);

    await updateUser(newEncryptedPassword, token.id);

    return res.status(200).json({
      message: `Password changed successfully. Please log in.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).send({ message: "Something went wrong", error });
  }
};
