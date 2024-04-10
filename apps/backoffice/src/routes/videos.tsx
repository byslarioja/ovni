import { PageTitle } from "@/components/PageTitle";
import VideosList from "@/features/videos-list";
import { getVideos } from "@/services/video.service";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/videos")({
  component: VideosPage,
  loader: getVideos,
});

function VideosPage() {
  const videos = Route.useLoaderData();

  return (
    <>
      <PageTitle>Vídeos</PageTitle>
      <VideosList {...videos} />
    </>
  );
}
