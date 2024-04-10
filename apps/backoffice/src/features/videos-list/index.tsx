import { Spinner } from "@/components/Spinner";
import { Video } from "@/components/Video";
import { ApiVideoResponse } from "@/types/video";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_URL;

export default function VideosList() {
  const { data, isPending } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
  });

  if (isPending) {
    return (
      <div className="grid place-content-center h-full">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.videos?.map((video) => <Video {...video} key={video.id} />)}
    </div>
  );
}

const getVideos = async (): Promise<ApiVideoResponse> => {
  const response = await axios.get(`${BASE_URI}/videos`);

  return response.data;
};
