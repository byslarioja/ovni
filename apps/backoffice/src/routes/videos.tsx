import { PageTitle } from "@/components/PageTitle";
import { Video } from "@/components/Video";
import { createFileRoute } from "@tanstack/react-router";

const data = [
  {
    user: { userId: "anang", username: "sntlln.93" },
    video: {
      thumbnail: "https://i3.ytimg.com/vi/erLk59H86ww/maxresdefault.jpg",
      uri: "https://i3.ytimg.com/vi/erLk59H86ww/maxresdefault.jpg",
      videoId: "!gjbagaga",
      uploadedAt: new Date(),
      capturedAt: new Date(),
    },
    "meta-data": {},
    sensors: {},
  },
];

export const Route = createFileRoute("/videos")({
  component: VideosPage,
});

function VideosPage() {
  return (
    <>
      <PageTitle>Vídeos</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((videoData, index) => (
          <Video video={videoData} key={index} />
        ))}
      </div>
    </>
  );
}
