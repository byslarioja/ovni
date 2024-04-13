export const getElapsedTime = (startTime: number) => {
  if (!startTime) return "00:00:00";

  const now = Date.now();

  const totalSeconds = Math.floor((now - startTime) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
