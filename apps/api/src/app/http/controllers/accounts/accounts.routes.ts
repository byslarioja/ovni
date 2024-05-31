import { Router } from "express";

import {
  deleteAccountController,
  deleteAccountSchema,
} from "./delete-account-request";
import { validate } from "@app/http/middlewares/validator";

const accountRouter = Router();
accountRouter.post(
  "/delete-account",
  validate(deleteAccountSchema),
  deleteAccountController
);

export default accountRouter;
