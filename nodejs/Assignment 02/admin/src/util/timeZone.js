const dateStringOpt = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Bangkok",
};

export const formattedDateInTimeZone = (originalDate) => {
  return originalDate.toLocaleDateString(undefined, dateStringOpt);
};