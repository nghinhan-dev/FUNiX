let getSearchData = () => {
  let id = document.getElementById("input-id").value * 1;
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

let findBtn = document.getElementById("find-btn");
findBtn.addEventListener("click", () => {
  console.log("im clicked");

  let searchedList = [];
  let foundedPet = getSearchData();
  // console.log("foundedPet:", foundedPet);
  petList.map((pet) => {
    let searchIsValid = true;

    // check ID
    searchIsValid &&= findString(pet.id + "", foundedPet.id + "");
    console.log("check ID:", searchIsValid);

    // check Name
    searchIsValid &&= findString(pet.name, foundedPet.name);
    console.log("check Name:", searchIsValid);

    // check Type
    searchIsValid &&= pet.type == foundedPet.type || foundedPet.type == "";
    console.log("check Type:", searchIsValid);

    // check Breed
    searchIsValid &&= pet.breed == foundedPet.breed || foundedPet.breed == "0";
    console.log("check Breed:", searchIsValid);

    searchIsValid &&= searchByHealthy(pet, foundedPet);

    if (searchIsValid) {
      searchedList.push(pet);
    }
  });

  renderList("Search Pet", searchedList);
});
