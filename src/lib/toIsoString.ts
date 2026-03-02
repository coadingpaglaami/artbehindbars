export const toISOString = (date: Date, time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  // Convert to UTC ISO string: "2026-02-13T14:30:00Z"
  return result.toISOString().replace(/\.\d{3}Z$/, "Z");
};