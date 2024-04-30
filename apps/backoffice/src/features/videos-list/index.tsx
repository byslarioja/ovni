import { ApiVideoResponse } from "@/types/api";
import { Video } from "./Video";

export default function VideosList({ videos }: ApiVideoResponse) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Video {...video} key={video.id} />
      ))}
    </div>
  );
}
