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

exports.validType = async (req, res, next) => {
  const data = req.body;
  const validationErrors = validator(data);

  if (validationErrors.length > 0) {
    res.status(400).json({ errors: validationErrors });
  } else {
    next(); // No errors, proceed to the next middleware
  }
};

function validator(data) {
  const validationErrors = [];

  for (const [key, value] of Object.entries(data)) {
    const errors = validateProperty(key, value);
    if (errors) {
      validationErrors.push(...errors);
    }
  }

  return validationErrors;
}

function validateProperty(key, value) {
  switch (key) {
    case "title":
    case "name":
    case "city":
    case "address":
    case "desc":
      return validateNotEmpty(key, value);

    case "cheapestPrice":
    case "rating":
    case "number":
    case "price":
    case "maxPeople":
    case "phoneNumber":
      return validateNumber(key, value);

    case "type":
    case "rooms":
    case "photos":
      return validateArrayNotEmpty(key, value);

    case "roomNums":
      return validateArrayIsNumber(key, value);

    default:
      return null; // No error
  }
}

function validateNotEmpty(key, value) {
  if (!value || value.trim() === "") {
    return [`${key} cannot be empty`];
  }
  return null; // No error
}

function validateNumber(key, value) {
  if (!value || value.trim() === "") {
    return [`${key} cannot be empty`];
  }

  if (isNaN(value)) {
    return [`${key} must be a number`];
  }
  if (value === 0) {
    return [`Missing ${key} in body`];
  }
  return null; // No error
}

function validateArrayNotEmpty(key, value) {
  const arrValue = value.split(",");
  if (arrValue.some((currentValue) => currentValue.trim() === "")) {
    return [`Contain empty value in ${key}`];
  }
  return null; // No error
}

function validateArrayIsNumber(key, value) {
  if (value.length === 0) {
    return [`${key} cannot be empty`];
  }

  const arrValue = value.split(",");
  if (arrValue.some((currentValue) => isNaN(currentValue))) {
    return [`Contain Not-a-Number value in ${key}`];
  }
  if (arrValue.some((currentValue) => currentValue === 0)) {
    return [`Contain empty value in ${key}`];
  }
  return null; // No error
}
