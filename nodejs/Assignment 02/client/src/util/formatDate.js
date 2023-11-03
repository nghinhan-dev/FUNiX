import isValid from "date-fns/isValid";

export function formatDate(date) {
  const formatDate = new Date(date);

  if (!isValid(formatDate)) return date;

  const year = formatDate.getFullYear();
  const month = (formatDate.getMonth() + 1).toString().padStart(2, "0");
  const day = formatDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
