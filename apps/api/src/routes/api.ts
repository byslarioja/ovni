import { Router } from "express";
import authRouter from "@app/http/controllers/auth/auth.routes";

const router = Router();

router.get("/", (req, res) => res.json({ message: "test" }));

router.use("/auth", authRouter);

export default router;
