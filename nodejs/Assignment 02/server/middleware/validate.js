const { validator } = require("./validate-fnc");

exports.createUser = async (req, res, next) => {
  const password = req.body.password;
  const confirm = req.body.confirm;

  if (password !== confirm) {
    return res.status(404).send({ statusText: "Unmatch password with error" });
  }

  next();
};

exports.addRoom = async (req, res, next) => {
  const number = req.body.number * 1;
  let reqBookedRanges;

  try {
    reqBookedRanges = JSON.parse(req.body.dateRange);
  } catch (error) {
    return res
      .status(400)
      .send({ statusText: "Invalid JSON format for bookedRange" });
  }

  const bookedRangeSchema = {
    startDate: Date,
    endDate: Date,
  };

  isNumber("number", number, res);

  if (!Array.isArray(reqBookedRanges)) {
    return res.status(400).send({ statusText: "dateRange must be an array" });
  }

  for (const range of reqBookedRanges) {
    for (const key in bookedRangeSchema) {
      // Attempt to parse the date string
      const dateValue = new Date(range[key]);

      // Check if dateValue is a valid Date object
      if (!(key in range) || isNaN(dateValue.getTime())) {
        return res
          .status(400)
          .json({ error: `Invalid schema for bookedRange: ${key}` });
      }
    }
  }

  next();
};

exports.addHotel = async (req, res, next) => {
  const data = req.body;
  const validationErrors = validator(data);

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
  } else {
    next(); // No errors, proceed to the next middleware
  }
};

exports.validateReqBody = async (req, res, next) => {
  const data = req.body;
  const validationErrors = validator(data);

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
  } else {
    next(); // No errors, proceed to the next middleware
  }
};
