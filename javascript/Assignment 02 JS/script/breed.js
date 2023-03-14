let form = document.getElementById("myForm");

let getBreedForm = () => {
  let type = document.getElementById("input-type").value;
  let breed = document.getElementById("input-breed").value;

  let breedData = new Breed(type, breed);

  return breedData;
};

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", () => {
  let newBreed = getBreedForm();
  let isValid = true;

  isValid = isValid && checkEmty("Breed", newBreed.breed);
  isValid = isValid && checkUnChoose("Type", newBreed.type);

  if (isValid) {
    breedList.push(newBreed);
    saveBreedListToLocalStorage(breedList);
    renderList("Breed Management", breedList);
    form.reset();
  }

  return;
});

// Delete Breed
let deleteBreed = (breed) => {
  let index = breedList.findIndex((item) => item.breed == breed);

  breedList.splice(index, 1);
  saveBreedListToLocalStorage(breedList);
  renderList("Breed Management", breedList);
};
