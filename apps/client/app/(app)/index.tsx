import Camera from "Screens/Camera";
import { useEffect } from "react";
import * as TaskManager from "expo-task-manager";
import { UploadTask } from "Shared/services/upload-video.service";
import { registerTaskAsync } from "expo-background-fetch";

const BACKGROUND_FETCH_TASK = "video-upload-task";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, UploadTask);

async function registerBackgroundFetchAsync() {
  return registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export default function Page() {
  useEffect(() => {
    const register = async () => {
      await registerBackgroundFetchAsync();
    };

    register();
  }, []);

  return <Camera />;
}
