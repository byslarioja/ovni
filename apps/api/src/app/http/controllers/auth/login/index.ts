import { Response } from "express";
import { LoginUserRequest } from "./schema";
import { findByEmail } from "@app/repositories/user.repository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserResource } from "@app/http/resources/user.resource";

export const login = async (req: LoginUserRequest, res: Response) => {
  const validated = req.body;

  try {
    const foundUser = await findByEmail(validated.email);

    if (!foundUser) {
      return res.status(404).json({ message: "No user with this email found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      validated.password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(422).json({ message: "Login credentials are invalid" });
    }

    const token = sign(
      { id: foundUser.id, email: foundUser.email },
      "SECRET_KEY",
      {
        expiresIn: "30 days",
      }
    );

    return res
      .status(200)
      .json({ user: new UserResource(foundUser).toJson(), token });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};
