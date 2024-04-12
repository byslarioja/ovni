import { Router } from "express";

import { validate } from "@app/http/middlewares/validator";
import { auth } from "@app/http/middlewares/auth";
import { VideoSchema, createVideoController } from "./create-video";
import { getVideosController } from "./get-videos";
import multer from "multer";
import path from "path";

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "uploads/");
  },
  filename: function (_, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter(_, file, cb) {
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
  [auth, validate(VideoSchema), upload.single("file")],
  createVideoController
);
videoRouter.get("/", getVideosController);

export default videoRouter;
