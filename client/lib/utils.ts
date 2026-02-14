export function formatDate(date: string | Date): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "Invalid Date";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}
