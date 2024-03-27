import { Router } from "express";

import { getUsersController } from "./get-users";

const userRouter = Router();

userRouter.get("/", getUsersController);

export default userRouter;
