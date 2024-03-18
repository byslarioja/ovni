import { Router } from "express";

import { auth } from "@app/http/middlewares/auth";
import { validate } from "@app/http/middlewares/validator";

import { registerController, RegistrableUserSchema } from "./register";
import { loginController, LoginUserSchema } from "./login";
import {
  forgotPasswordController,
  ForgotPasswordSchema,
} from "./forgot-password";
import {
  changePasswordController,
  ChangePasswordSchema,
} from "./change-password";
import { checkAuthController } from "./check-auth";

const authRouter = Router();

authRouter.post(
  "/register",
  validate(RegistrableUserSchema),
  registerController
);

authRouter.post("/login", validate(LoginUserSchema), loginController);

authRouter.post(
  "/forgot-password",
  validate(ForgotPasswordSchema),
  forgotPasswordController
);

authRouter.post(
  "/change-password",
  [auth, validate(ChangePasswordSchema)],
  changePasswordController
);

authRouter.get("/check-auth", auth, checkAuthController);

export default authRouter;
