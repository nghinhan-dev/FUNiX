let errAlert = (field, message) => {
  Swal.fire({
    title: field,
    text: message,
    icon: "warning",
  });
};

let checkId = (id, data) => {
  let index = data.findIndex((item) => item.id == id);

  if (index != -1) {
    errAlert("ID", "ID must be unique!");
    return false;
  }

  return true;
};

let checkEmty = (field, str) => {
  if (validator.isEmpty(str) || str == "P000") {
    errAlert(field.toUpperCase(), "Cannot be empty!");
    return false;
  }

  return true;
};

let checkUnChoose = (field, str) => {
  if (str == "0") {
    errAlert(field.toUpperCase(), `Please select ${field} type`);
    return false;
  }

  return true;
};

let checkValue = (field, value, min, max) => {
  if (value >= max || value <= min) {
    errAlert(
      field.toUpperCase(),
      `${field} value must be between ${min} and ${max}`
    );

    return false;
  }

  return true;
};

let findString = (str, seed) => {
  let result = validator.contains(str, seed, { ignoreCase: true });
  return result;
};

let checkPetSubmit = (pet, list) => {
  let result =
    checkEmty("ID", pet.id) &&
    checkId(pet.id, list) &&
    checkEmty("Name", pet.name) &&
    checkValue("Age", pet.age, 1, 15) &&
    checkUnChoose("Type", pet.type) &&
    checkUnChoose("Breed", pet.breed) &&
    checkValue("Weight", pet.weight, 1, 15) &&
    checkValue("Length", pet.lenght, 1, 100);

  return result;
};

let checkPetUpdate = (pet) => {
  let valid =
    checkEmty("Name", pet.name) &&
    checkValue("Age", pet.age, 1, 15) &&
    checkUnChoose("Type", pet.type) &&
    checkUnChoose("Breed", pet.breed) &&
    checkValue("Weight", pet.age, 1, 15) &&
    checkValue("Length", pet.age, 1, 100);

  return valid;
};
