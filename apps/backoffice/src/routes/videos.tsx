import { PageTitle } from "@/components/PageTitle";
import VideosList from "@/features/videos-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/videos")({
  component: VideosPage,
});

function VideosPage() {
  return (
    <>
      <PageTitle>Vídeos</PageTitle>
      <VideosList />
    </>
  );
}
