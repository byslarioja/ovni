import { Link, createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/PageTitle";
import { getUser } from "@/services/user.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/typography";
import { formatDate, toTitleCase } from "@/lib/utils";
import VideosList from "@/features/videos-list";
import { Youtube } from "@/components/Icon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BanUser } from "@/features/ban-user";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

export const Route = createFileRoute("/users/$userId")({
  component: UserPage,
  loader: ({ context, params: { userId } }) => {
    context.title = "Usuarios";
    context.queryClient.ensureQueryData(userQueryOptions(userId));
  },
});

function UserPage() {
  const { userId } = Route.useParams();

  const {
    data: { user },
  } = useSuspenseQuery(userQueryOptions(userId));

  const displayName = toTitleCase(user.name);
  const fallbackAvatar = user.name
    .split(" ")
    .map((w) => w[0])
    .filter((_, i) => i < 2)
    .join("")
    .toUpperCase();

  const appendedVideos = user.videos.map((v) => ({ ...v, user }));

  const listableProperties = {
    id: user.id,
    email: user.email,
    phone: user.phone,
    country: user.country,
    city: user.city,
    zip_code: user.zip_code,
    youtube_channel: user.youtube_channel,
    since: user.created_at,
  };

  return (
    <>
      <PageTitle>Información de usuario</PageTitle>
      <div className="flex justify-between pb-10 gap-5">
        <main className="flex flex-col gap-5 min-w-[400px] ">
          <Card>
            <CardHeader className="flex flex-row gap-5">
              <Avatar>
                <AvatarImage src="https://placeholder.co/200x200" />
                <AvatarFallback>{fallbackAvatar}</AvatarFallback>
              </Avatar>

              <CardTitle>{displayName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex gap-2">
                <span className="font-bold">ID:</span> {listableProperties.id}
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Email:</span>
                {listableProperties.email}
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Canal de Youtube:</span>
                <Link className="flex gap-2" to={user.youtube_channel}>
                  {listableProperties.youtube_channel} <Youtube />
                </Link>
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Teléfono:</span>
                {listableProperties.phone}
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Ciudad:</span>
                {`${listableProperties.city} ${listableProperties.zip_code}, ${listableProperties.country}`}
              </p>
              <p className="flex gap-2">
                <span className="font-bold">Se unió:</span>
                {formatDate(user.created_at)}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <BanUser userId={user.id} userEmail={user.email} />
            </CardFooter>
          </Card>
        </main>

        <section className="flex flex-col w-full">
          <Heading variant="h3" className="mb-5">
            Vídeos de {displayName}
          </Heading>
          {appendedVideos.length ? (
            <VideosList videos={appendedVideos} />
          ) : (
            <p className="text-sm/relaxed">
              Este usuario todavía no ha subido contenido.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
