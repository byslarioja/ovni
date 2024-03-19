import { Router } from "express";

import { validate } from "@app/http/middlewares/validator";
import { VideoInfoSchema, videoInfoController } from "./video-info";
import { auth } from "@app/http/middlewares/auth";

const videoRouter = Router();

videoRouter.post(
  "/video-info",
  [auth, validate(VideoInfoSchema)],
  videoInfoController
);

export default videoRouter;
