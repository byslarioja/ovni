import { Request, Response } from "express";
import "dotenv/config";
import { deleteUser } from "@app/repositories/user.repository";

export const banUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await deleteUser(userId);

    return res.status(204);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
