import { Response } from "express";
import "dotenv/config";
import { deleteUser } from "@app/repositories/user.repository";
import { BanUserRequest } from "./schema";

export const banUserController = async (req: BanUserRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if(!userId) return res.status(422).send({message: "Param userId not provided"})

    await deleteUser(userId);

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
