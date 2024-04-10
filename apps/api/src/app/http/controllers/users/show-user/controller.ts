import { Response } from "express";
import "dotenv/config";
import { findById } from "@app/repositories/user.repository";
import { UserResource } from "@app/http/resources/user.resource";
import { ShowUserRequest } from "./schema";

export const showUserController = async (req: ShowUserRequest, res: Response) => {
  const { userId } = req.params;

  if(!userId) return res.status(422).send({message: "Param userId not provided"})

  try {
    const user = await findById(userId);

    if(!user) return res.status(404).send({message:'User not found'})

    return res.status(200).json(UserResource.toJson(user));
  } catch (error) {
    console.error(error);

    return res.status(500).send({ message: "Something went wrong" });
  }
};
