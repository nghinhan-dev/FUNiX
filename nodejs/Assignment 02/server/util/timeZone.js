const { parse, addHours } = require("date-fns");

const format = "MM/dd/yyyy";

const parseDate = (date) => {
  return addHours(parse(date, format, new Date()), 19);
};

module.exports = { parseDate };
