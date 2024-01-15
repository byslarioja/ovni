import { Router } from "express";
import { register } from "./register";
import { validate } from "@app/http/middlewares/validator";
import { RegistrableUserSchema } from "./register/schema";

const authRouter = Router();

authRouter.post("/register", validate(RegistrableUserSchema), register);

export default authRouter;
