import { Router } from "express";
import authRouter from "@app/http/controllers/auth/auth.routes";
import videoRouter from "@app/http/controllers/video/video.routes";

const router = Router();

router.get("/", (_, res) => res.status(200).json({ message: "ok" }));
router.use("/auth", authRouter);
router.use("/video", videoRouter);

export default router;
