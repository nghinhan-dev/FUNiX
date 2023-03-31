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
  console.log("newPet ID:", newPet.id);

  // validate if newPet is valid
  let isValid = checkPetSubmit(newPet, petList);

  if (isValid) {
    //add newPet to petList...
    petList.push(newPet);
    // ..save new petList to localStorage and re-render on the browser
    savePetListToLocalStorage();
    renderList("Pet Management", petList);
    // reset form
    form.reset();
  }
});

// Healthy button
let healthyBtn = document.getElementById("healthy-btn");
healthyBtn.addEventListener("click", () => {
  if (healthyBtn.innerText == "Show All Pet") {
    healthyBtn.innerText = "Show Healthy Pet";
    renderList("Pet Management", petList);
    return;
  }
  let healthyList = [];
  petList.map((pet) => {
    if (pet.vaccinated && pet.dewormed && pet.sterilized) {
      healthyList.push(pet);
    }
    healthyBtn.innerText = "Show All Pet";
  });

  renderList("Pet Management", healthyList);
});

// Delet button
let deleteFunction = (id) => {
  let index = petList.findIndex((item) => item.id == id);

  // get user confirm to execute the delete function
  Swal.fire({
    html: `Confirm delete`,
    confirmButtonText: "Cancel",
    showDenyButton: true,
    denyButtonText: `Delete`,
  }).then((result) => {
    if (result.isConfirmed) {
      return;
    } else if (result.isDenied) {
      petList.splice(index, 1);
      savePetListToLocalStorage();
      renderList("Pet Management", petList);
    }
  });
};

// BMI
let bmiBtn = document.getElementById("bmi-btn");
bmiBtn.addEventListener("click", () => {
  let bmiList = document.querySelectorAll(".bmi");
  for (let i = 0; i < petList.length; i++) {
    bmiList[i].innerText = petList[i].getBMI();
  }
});
