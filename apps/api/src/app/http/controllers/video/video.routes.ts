import { Router } from "express";

import { validate } from "@app/http/middlewares/validator";
import { auth } from "@app/http/middlewares/auth";
import { VideoSchema, videoController } from "./create-video";

const videoRouter = Router();

videoRouter.post("/", [auth, validate(VideoSchema)], videoController);

export default videoRouter;
