// Form
let form = document.getElementById("myForm");

// Add Breed types
let changeType = () => {
  let type = document.getElementById("input-type").value;

  renderBreed(type);
};

let renderBreed = (type) => {
  let selectOptions = `<option value="0">Select Breed</option>`;
  breedList.map((breed) => {
    if (breed.type == type) {
      selectOptions += `<option value="${breed.breed}">${breed.breed}</option>`;
    }
  });

  document.getElementById("input-breed").innerHTML = selectOptions;
};

// Submit button
let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", () => {
  let newPet = getFormData();
  let isValid = checkPetSubmit(newPet, petList);

  if (isValid) {
    petList.push(newPet);
    savePetListToLocalStorage();
    renderList("Pet Management", petList);
    form.reset();
  }
});

// Healthy button
let healthyBtn = document.getElementById("healthy-btn");
healthyBtn.addEventListener("click", () => {
  let healthyList = [];
  petList.map((pet) => {
    if (pet.vaccinated && pet.dewormed && pet.sterilized) {
      healthyList.push(pet);
    }
  });

  renderList("Pet Management", healthyList);
  // console.log("Render healthy list");
});

// Delet button
let deleteFunction = (id) => {
  let index = petList.findIndex((item) => item.id == id);

  petList.splice(index, 1);
  savePetListToLocalStorage();
  renderList("Pet Management", petList);
};
