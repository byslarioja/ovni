import { Router } from "express";

import { validate } from "@app/http/middlewares/validator";
import { auth } from "@app/http/middlewares/auth";
import { VideoSchema, createVideoController } from "./create-video";
import { getVideosController } from "./get-videos";

const videoRouter = Router();

videoRouter.post("/", [auth, validate(VideoSchema)], createVideoController);
videoRouter.get("/", getVideosController);

export default videoRouter;
