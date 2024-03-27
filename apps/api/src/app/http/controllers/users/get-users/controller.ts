import { Response } from "express";
import "dotenv/config";
import { getAllUsers } from "@app/repositories/user.repository";

export const getUsersController = async (_, res: Response) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
