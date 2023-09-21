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
  const validationErrors = [];

  for (const [key, value] of Object.entries(data)) {
    const error = isEmpty(key, value);
    if (error) {
      validationErrors.push(error);
    }
  }

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
  } else {
    next(); // No errors, proceed to the next middleware
  }
};

function isNumber(key, value, res) {
  if (typeof value !== "number") {
    return res.status(400).send({ statusText: `${key} must be a number` });
  }

  if (value === 0) {
    return res.status(400).send({ statusText: `Missing ${key} in body` });
  }

  return;
}

function isEmpty(key, value) {
  if (value.length === 0) {
    return `${key} cannot be empty`;
  }

  // Validate array of strings
  if (key === "type" || key === "rooms" || key === "photos") {
    const arrValue = value.split(",");
    if (arrValue.some((currentValue) => currentValue.trim() === "")) {
      return `Contain empty value in ${key}`;
    }
  }

  return null; // No error
}
