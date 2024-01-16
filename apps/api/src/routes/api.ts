import { Router } from "express";
import authRouter from "@app/http/controllers/auth/auth.routes";

const router = Router();

router.use("/auth", authRouter);

export default router;
