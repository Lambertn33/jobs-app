export const formatDate = (date: string) => {
  const originalDate = new Date(date);
  return originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
