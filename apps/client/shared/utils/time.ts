export function formatDate(timestamp: Date): string;
export function formatDate(timestamp: number): string;
export function formatDate(timestamp: Date | number): string {
  let date: Date;

  date = timestamp instanceof Date ? timestamp : new Date(timestamp);

  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}
