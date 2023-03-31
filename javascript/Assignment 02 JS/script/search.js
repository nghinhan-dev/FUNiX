let getSearchData = () => {
  let id = document.getElementById("input-id").value;
  let name = document.getElementById("input-name").value;
  let type = document.getElementById("input-type").value;
  let breed = document.getElementById("input-breed").value;
  let vaccinated = document.getElementById("input-vaccinated").checked;
  let dewormed = document.getElementById("input-dewormed").checked;
  let sterilized = document.getElementById("input-sterilized").checked;

  let pet = new Pet(
    id,
    name,
    22,
    type,
    10,
    10,
    "#fff",
    breed,
    vaccinated,
    dewormed,
    sterilized,
    new Date()
  );

  return pet;
};

let searchResult = (inputPet, currentPet) => {
  // check if ID is the same or valid
  if (!validator.contains(currentPet.id, inputPet.id)) {
    return false;
  }

  // check name
  if (!validator.contains(currentPet.name, inputPet.name)) {
    return false;
  }

  // check type
  if (inputPet.type == "0") {
    return true;
  } else if (inputPet.type != currentPet.type) {
    return false;
  }

  // check breed
  if (inputPet.breed == "0") {
    return true;
  } else if (inputPet.breed != currentPet.breed) {
    return false;
  }

  // check healthy state

  let isVaccinated = inputPet.vaccinated ? 1 : 0;
  let isDewormed = inputPet.dewormed ? 3 : 0;
  let isSterilized = inputPet.sterilized ? 5 : 0;

  let result = isVaccinated + isDewormed + isSterilized;
  if (result == 0) {
    return true;
  } else {
    switch (result) {
      case 1:
        if (currentPet.vaccinated) {
          return true;
        } else return false;
      case 3:
        if (currentPet.dewormed) {
          return true;
        } else return false;
      case 4:
        if (currentPet.dewormed && currentPet.vaccinated) {
          return true;
        } else return false;
      case 5:
        if (currentPet.sterilized) {
          return true;
        } else return false;
      case 6:
        if (currentPet.sterilized && currentPet.vaccinated) {
          return true;
        } else return false;
      case 8:
        if (currentPet.sterilized && currentPet.dewormed) {
          return true;
        } else return false;
      case 9:
        if (
          currentPet.sterilized &&
          currentPet.vaccinated &&
          currentPet.dewormed
        ) {
          return true;
        } else return false;
    }
  }

  return true;
};

let findBtn = document.getElementById("find-btn");
findBtn.addEventListener("click", () => {
  let searchList = [];
  let foundedPet = getSearchData();
  // console.log("foundedPet:", foundedPet);
  for (let i = 0; i < petList.length; i++) {
    if (searchResult(foundedPet, petList[i])) {
      searchList.push(petList[i]);
    }
    // searchResult(foundedPet, petList[i]);
  }

  renderList("Search Pet", searchList);
});
