import { Router } from "express";
import { register } from "./register";
import { validate } from "@app/http/middlewares/validator";
import { RegistrableUserSchema } from "./register/schema";
import { LoginUserSchema } from "./login/schema";
import { login } from "./login";

const authRouter = Router();

authRouter.post("/register", validate(RegistrableUserSchema), register);
authRouter.post("/login", validate(LoginUserSchema), login);

export default authRouter;
