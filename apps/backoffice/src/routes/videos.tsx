import { PageTitle } from "@/components/PageTitle";
import VideosList from "@/features/videos-list";
import { getVideos } from "@/services/video.service";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const videosQueryOptions = queryOptions({
  queryKey: ["videos"],
  queryFn: getVideos,
});

export const Route = createFileRoute("/videos")({
  component: VideosPage,
  loader: ({ context }) => {
    context.title = "Videos";
    context.queryClient.ensureQueryData(videosQueryOptions);
  },
});

function VideosPage() {
  const { data: videos } = useSuspenseQuery(videosQueryOptions);

  return (
    <>
      <PageTitle>Vídeos</PageTitle>
      <VideosList {...videos} />
    </>
  );
}
