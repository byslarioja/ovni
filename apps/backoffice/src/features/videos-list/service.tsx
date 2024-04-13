import { Video } from "@/types/entities";

export function handleDownloadReadings(video: Video) {
  // Map the readings to the desired format
  const minTimestamp = video.readings.reduce((min, reading, index) => {
    if (index === 0) return reading.timestamp;

    return reading.timestamp < min ? reading.timestamp : min;
  }, Number(video.start_time));

  // const maxTimestamp = minTimestamp + video.duration * 1000; // Convert video duration to milliseconds

  const readingsContent = video.readings
    //Filtering won't work until startTime and endTime are correctly set on mobile app
    // .filter((reading) => {
    //   // Only include readings whose timestamps are within the video duration
    //   return (
    //     reading.timestamp >= minTimestamp && reading.timestamp <= maxTimestamp
    //   );
    // })
    .map((reading) => {
      const elapsedTime = reading.timestamp - minTimestamp;
      const totalSeconds = Math.floor(elapsedTime / 1000);

      let hours: number | string = Math.floor(totalSeconds / 3600);
      let minutes: number | string = Math.floor(
        (totalSeconds - hours * 3600) / 60
      );
      let seconds: number | string = totalSeconds - hours * 3600 - minutes * 60;

      // Pad hours, minutes and seconds with zeros if they are less than 10.
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      const formattedTimeElapsed = `${hours}:${minutes}:${seconds}`;

      return {
        ...reading,
        secondsElapsed: `${totalSeconds}`,
        formattedTimeElapsed,
      };
    })

    .sort((a, b) => a.timestamp - b.timestamp);

  const content = {
    // ...video,
    user: { id: video.user.id, email: video.user.email },
    readings: readingsContent,
  };

  const contentStr = JSON.stringify(content, null, 2);
  const blob = new Blob([contentStr], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element
  const a = document.createElement("a");
  a.href = url;
  a.download = `${video.id}.txt`;
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
