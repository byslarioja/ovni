import { Router } from "express";
import authRouter from "@app/http/controllers/auth/auth.routes";
import userRouter from "@app/http/controllers/users/users.routes";
import videoRouter from "@app/http/controllers/video/video.routes";
import accountRouter from "@app/http/controllers/accounts/accounts.routes";

const router = Router();

router.get("/", (_, res) => res.status(200).json({ message: "ok" }));
router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/videos", videoRouter);
router.use("/accounts", accountRouter);

export default router;
