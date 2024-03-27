import { Request, Response } from "express";
import "dotenv/config";
import { deleteUser } from "@app/repositories/user.repository";

// DELETE /api/users/581c7380-7b9f-4e41-9790-0fc399c369b5 <= URI is correct
export const banUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId); //prints out the correct parm
    await deleteUser(userId);

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong" });
  }
};
