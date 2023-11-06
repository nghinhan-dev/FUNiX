const dateStringOpt = {
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Bangkok",
};

export const formattedDateInTimeZone = (originalDate) => {
  return originalDate.toLocaleDateString(undefined, dateStringOpt);
};

export const formatDateFormAPI = (dateString) => {
  const newDate = new Date(dateString);
  return formattedDateInTimeZone(newDate);
};
