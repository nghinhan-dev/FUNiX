// Form
let form = document.getElementById("myForm");

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
  // id = id.trim().toUpperCase();
  // console.log("id:", id);
  let index = petList.findIndex((item) => item.id == id);

  petList.splice(index, 1);
  savePetListToLocalStorage();
  renderList("Pet Management", petList);
};
