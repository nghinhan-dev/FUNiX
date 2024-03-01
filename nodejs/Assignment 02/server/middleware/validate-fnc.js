const isValid = require("date-fns/isValid");

function validator(data) {
  const validationErrors = [];

  for (const [key, value] of Object.entries(data)) {
    // console.log(key, ": ", value);
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
    case "email":
    case "fullName":
    case "city":
    case "address":
    case "user":
    case "username":
    case "password":
    case "payment":
    case "hotel":
    case "desc":
      return validateNotEmpty(key, value);

    case "cheapestPrice":
    case "rating":
    case "number":
    case "price":
    case "total":
    case "maxPeople":
    case "phoneNumber":
    case "distance":
      return validateNumber(key, value);

    case "identifyNumber":
      return validateIndentifyNumber(key, value);

    case "types":
    case "typeTitles":
      return validateArrayText(key, value);

    case "photos":
      return validateArrayImgUrl(key, value);

    case "type":
      return validateArrayNotEmpty(key, value);

    case "rooms":
    case "roomNums":
      return validateArrayNumber(key, value);

    case "dateStart":
    case "dateEnd":
      return validateDate(key, value);

    case "featured":
      return validateBoolean(key, value);

    case "roomIds":
    case "typeIds":
      return null;

    default:
      return [`Unknow property ${key}`];
  }
}

function validateNotEmpty(key, value) {
  if (!value || value.trim() === "") {
    return [`${key} cannot be empty`];
  }
  return null; // No error
}

function validateNumber(key, value) {
  if (!isNaN(value)) return null;

  if (isNaN(value)) {
    return [`${key} must be a number`];
  }

  if (!value || value.trim() === "") {
    return [`${key} cannot be empty`];
  }

  if (value * 1 === 0) {
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

function isValidObjectId(value) {
  // Check if the ID is a 24-character hexadecimal string
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;

  return objectIdPattern.test(value);
}

function validateArrayNumber(key, value) {
  if (value.length === 0) {
    return [`${key} cannot be empty`];
  }

  const arrValue = value.split(",");
  if (arrValue.some((currentValue) => isNaN(currentValue))) {
    return [`Contain Not-a-Number  in ${key}`];
  }

  if (arrValue.some((currentValue) => currentValue * 1 === 0)) {
    return [`Contain empty value in ${key}`];
  }
  return null; // No error
}

function validateArrayImgUrl(key, value) {
  if (value.length === 0) {
    return [`${key} cannot be empty`];
  }

  const arrValue = value.split(",");

  if (arrValue.some((currentValue) => currentValue.trim() === "")) {
    return [`Contain empty value in ${key}`];
  }
  return null; // No error
}

function validateArrayText(key, value) {
  if (value.length === 0) {
    return [`${key} cannot be empty`];
  }

  const arrValue = value.split(",");
  if (arrValue.some((currentValue) => currentValue.trim() === "")) {
    return [`Contain empty element in ${key}`];
  }

  return null; // No error
}

function validateBoolean(key, value) {
  if (!(value === "true" || value === "false")) {
    return [`Invalid ${key} value`];
  }
}

function validateIndentifyNumber(key, value) {
  validateNumber(key, value);

  if (value.length !== 12) {
    return ["Incorrect ID number format"];
  }
  return null; // No error
}

function validateDate(key, value) {
  if (!isValid(new Date(value))) {
    return [`${key} is invalid date format`];
  }

  return null;
}

module.exports = { validator, isValidObjectId };
