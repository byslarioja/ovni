import { Response } from "express";
import { RegisterUserRequest } from "./schema";
import { createUser } from "@app/repositories/user.repository";

export const register = async (req: RegisterUserRequest, res: Response) => {
  const validated = req.body;

  const user = await createUser(validated);

  return res.status(201).json(user);
};
