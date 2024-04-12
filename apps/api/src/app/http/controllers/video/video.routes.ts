import { Router } from "express";

import { validate } from "@app/http/middlewares/validator";
import { auth } from "@app/http/middlewares/auth";
import { VideoSchema, createVideoController } from "./create-video";
import { getVideosController } from "./get-videos";
import multer from "multer";

// Set up multer for file uploads
const upload = multer({
  dest: "uploads/",
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4)$/)) {
      // Only allow .mp4 files
      return cb(new Error("Please upload an MP4 video"));
    }

    cb(null, true);
  },
});

const videoRouter = Router();

videoRouter.post(
  "/",
  [auth, validate(VideoSchema), upload.single("video")],
  createVideoController
);
videoRouter.get("/", getVideosController);

export default videoRouter;
