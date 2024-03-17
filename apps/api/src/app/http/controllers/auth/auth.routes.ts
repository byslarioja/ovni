import { Router } from "express";
import { register } from "./register";
import { validate } from "@app/http/middlewares/validator";
import { RegistrableUserSchema } from "./register/schema";
import { LoginUserSchema } from "./login/schema";
import { login } from "./login";
import { ForgotPasswordSchema } from "./forgot-password/schema";
import { forgotPassword } from "./forgot-password";
import { auth } from "@app/http/middlewares/auth";

const authRouter = Router();

authRouter.post("/register", validate(RegistrableUserSchema), register);
authRouter.post("/login", validate(LoginUserSchema), login);
authRouter.post(
  "/forgot-password",
  validate(ForgotPasswordSchema),
  forgotPassword
);

export default authRouter;
