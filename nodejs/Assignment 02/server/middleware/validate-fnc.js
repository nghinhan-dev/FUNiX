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

    case "typeTitles":
      return validateArrayText(key, value);

    case "photos":
      return validateArrayImgUrl(key, value);

    case "type":
      return validateArrayNotEmpty(key, value);

    case "roomNums":
      return validateArrayNumber(key, value);

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
  if (!value || value.trim() === "") {
    return [`${key} cannot be empty`];
  }

  if (isNaN(value)) {
    return [`${key} must be a number`];
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

function isValidImageUrl(url) {
  // Define a regular expression pattern for image URLs
  const imageUrlPattern = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;

  // Test the URL against the pattern
  return imageUrlPattern.test(url);
}

function validateArrayImgUrl(key, value) {
  if (value.length === 0) {
    return [`${key} cannot be empty`];
  }

  const arrValue = value.split(",");
  if (arrValue.some((currentValue) => isValidImageUrl(currentValue))) {
    return [`Contain invalid image-url in ${key}`];
  }

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

module.exports = { validator, isValidObjectId };
