let form = document.getElementById("container-form");

// Display pet info in form
let editFunction = (id) => {
  form.classList.remove("hide");

  let index = petList.findIndex((item) => item.id == id);

  document.getElementById("input-id").value = petList[index].id;
  document.getElementById("input-id").disabled = true;

  document.getElementById("input-name").value = petList[index].name;
  document.getElementById("input-age").value = petList[index].age;
  document.getElementById("input-type").value = petList[index].type;
  renderBreed(petList[index].type);
  document.getElementById("input-weight").value = petList[index].weight;
  document.getElementById("input-length").value = petList[index].length;
  document.getElementById("input-color-1").value = petList[index].color;
  document.getElementById("input-breed").value = petList[index].breed;
  document.getElementById("input-vaccinated").checked =
    petList[index].vaccinated;
  document.getElementById("input-dewormed").checked = petList[index].dewormed;
  document.getElementById("input-sterilized").checked =
    petList[index].sterilized;
};

// Update Pet Information
let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
  let id = document.getElementById("input-id").value;
  console.log(id);
  let index = petList.findIndex((item) => item.id == id);
  console.log("index:", index);

  let updatedPet = getFormData();
  let isValid = checkPetUpdate(updatedPet, petList);

  if (!isValid) return;

  updatedPet.id = id;
  // Dòng này bởi vì getFormData() sẽ trả id lấy từ form về đã được định dạng ở dạng P0{id} nên định dạng lại sẽ gây ra lỗi

  petList[index] = updatedPet;
  savePetListToLocalStorage();
  renderList("", petList);

  document.getElementById("input-id").disabled = false;
  form.classList.add("hide");
});
