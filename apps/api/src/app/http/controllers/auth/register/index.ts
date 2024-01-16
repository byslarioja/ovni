import { Response } from "express";
import { RegisterUserRequest } from "./schema";
import { createUser } from "@app/repositories/user.repository";
import { UserResource } from "@app/http/resources/user.resource";

export const register = async (req: RegisterUserRequest, res: Response) => {
  const validated = req.body;

  const user = await createUser(validated);

  return res.status(201).json(new UserResource(user).toJson());
};
