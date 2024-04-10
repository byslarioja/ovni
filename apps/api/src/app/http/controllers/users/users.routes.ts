import { Router } from "express";

import { getUsersController } from "./get-users";
import { banUserController } from "./ban-user";
import { showUserController } from "./show-user";

const userRouter = Router();

userRouter.get("/:userId", showUserController);
userRouter.get("/", getUsersController);
userRouter.delete("/:userId", banUserController);

export default userRouter;
