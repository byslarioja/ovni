import { Router } from "express";

import { getUsersController } from "./get-users";
import { banUserController } from "./ban-user";

const userRouter = Router();

userRouter.get("/", getUsersController);
userRouter.delete("/:userId", banUserController);

export default userRouter;
