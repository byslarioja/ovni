import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { VideoProps } from "@/types/video";
import { DownloadCloud, Info, Trash } from "lucide-react";

export function Video(video: VideoProps) {
  return (
    <Card>
      <CardContent className="p-0 relative rounded-t-lg overflow-hidden">
        <img
          className="object-cover h-48 w-full "
          src={video.uri || "https://placehold.co/640x360"}
        />
        <div className="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-10"></div>
        <div className="absolute text-white right-0 top-0 py-3 px-6 z-20 text-lg text-muted-foreground">
          <p className="text-right">
            Capturado por <a href={`${video.user.id}`}>{video.user.name}</a>
          </p>
          <p className="text-right">{formatDate(Number(video.start_time))}</p>
        </div>
      </CardContent>
      <CardFooter className="p-3 justify-end gap-1">
        <Button variant="destructive" size="icon">
          <Trash />
        </Button>
        <Button variant="default" size="icon" className="bg-lime-600">
          <DownloadCloud />
        </Button>
        <Button variant="default" size="icon" className="bg-sky-600">
          <Info />
        </Button>
      </CardFooter>
    </Card>
  );
}
