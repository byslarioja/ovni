import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate, toTitleCase } from "@/lib/utils";
import { VideoProps } from "@/types/props";
import { Link } from "@tanstack/react-router";
import { DownloadCloud, Info, User2 } from "lucide-react";
import { handleDownloadReadings } from "./service";
import { DeleteVideo } from "../delete-video";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/Spinner";

export function Video(video: VideoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = () => {
        setIsLoading(false);
      };
    }
  }, []);

  return (
    <Card className="min-w-[250px]">
      <CardContent className="p-0 relative rounded-t-lg overflow-hidden">
        {isLoading && (
          <div className="bg-secondary absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
        <video
          ref={videoRef}
          className="object-cover h-48 w-full"
          src={video.uri}
        />
        <div className="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"></div>
        <div className="absolute text-white right-0 top-0 py-3 px-6 z-20 text-lg text-muted-foreground">
          <p className="text-right">
            <Link to="/users/$userId" params={{ userId: video.user.id }}>
              {toTitleCase(video.user.name)}
            </Link>
          </p>
          <p className="text-right">{formatDate(video.created_at)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-3 justify-end gap-1">
        <DeleteVideo videoId={video.id} userEmail={video.user.email} />
        <Button
          variant="default"
          size="icon"
          className="bg-lime-600 text-white"
          asChild
        >
          <a href={video.uri} download={`${video.id}.mp4`} target="_blank">
            <DownloadCloud />
          </a>
        </Button>

        <Button variant="default" size="icon" asChild>
          <Link to="/users/$userId" params={{ userId: video.user.id }}>
            <User2 />
          </Link>
        </Button>

        <Button
          variant="default"
          size="icon"
          className="bg-sky-600 text-white"
          onClick={() => handleDownloadReadings(video)}
        >
          <Info />
        </Button>
      </CardFooter>
    </Card>
  );
}
