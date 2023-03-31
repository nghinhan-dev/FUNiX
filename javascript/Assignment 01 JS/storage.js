// Pet class
class Pet {
  constructor(
    _id,
    _name,
    _age,
    _type,
    _weight,
    _length,
    _color,
    _breed,
    _vaccinated,
    _dewormed,
    _sterilized,
    _date
  ) {
    this.id = _id;
    this.name = _name + "";
    this.age = _age + "";
    this.type = _type + "";
    this.weight = _weight + "";
    this.length = _length + "";
    this.color = _color + "";
    this.breed = _breed + "";
    this.vaccinated = _vaccinated;
    this.dewormed = _dewormed;
    this.sterilized = _sterilized;
    this.date = _date;
  }

  getDateString() {
    let result = `${
      this.date.getMonth() + 1
    }/${this.date.getDate()}/${this.date.getFullYear()}`;

    return result;
  }

  getBMI() {
    let result = 0;
    if (this.type == "Dog") {
      result = (this.weight * 703) / this.length ** 2;
    } else {
      result = (this.weight * 886) / this.length ** 2;
    }

    return Math.round(result * 100) / 100;
  }
}

// Breed Class
class Breed {
  constructor(_type, _breed) {
    this.type = _type;
    this.breed = _breed;
  }
}

let getFormData = () => {
  let id = document.getElementById("input-id").value * 1;
  let name = document.getElementById("input-name").value;
  let age = document.getElementById("input-age").value;
  let type = document.getElementById("input-type").value;
  let weight = document.getElementById("input-weight").value;
  let length = document.getElementById("input-length").value;
  let color = document.getElementById("input-color-1").value;
  let breed = document.getElementById("input-breed").value;
  let vaccinated = document.getElementById("input-vaccinated").checked;
  let dewormed = document.getElementById("input-dewormed").checked;
  let sterilized = document.getElementById("input-sterilized").checked;

  let pet = new Pet(
    `P00${id}`,
    name,
    age,
    type,
    weight,
    length,
    color,
    breed,
    vaccinated,
    dewormed,
    sterilized,
    new Date()
  );

  return pet;
};

// Current page
let currentPage = document.getElementById("currentPage").innerText;

// Render petList
let renderList = (page, list) => {
  let tableContent = "";

  if (page == "Breed Management") {
    for (let index = 0; index < list.length; index++) {
      let currentItem = list[index];
      let rowContent = `
    <tr>
      <th scope="row">${index + 1}</th>
      <td>${currentItem.breed}</td>
      <td>${currentItem.type}</td>
      <td><button type="button" class="btn btn-danger">Delete</button>
      </td>
    </tr>`;

      tableContent += rowContent;
    }

    document.getElementById("tbody").innerHTML = tableContent;
  } else {
    for (let index = 0; index < list.length; index++) {
      let currentItem = list[index];
      let rowContent = `
    <tr>
      <th scope="row">${currentItem.id}</th>
      <td>${currentItem.name}</td>
      <td>${currentItem.age}</td>
      <td>${currentItem.type}</td>
      <td>${currentItem.weight} kg</td>
      <td>${currentItem.length} cm</td>
      <td>${currentItem.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${currentItem.color}"></i>
      </td>
      <td>${
        currentItem.vaccinated
          ? `<i class="bi bi-check-circle-fill"></i>`
          : `<i class="bi bi-x-circle-fill"></i>`
      }</td>
      <td>${
        currentItem.dewormed
          ? `<i class="bi bi-check-circle-fill"></i>`
          : `<i class="bi bi-x-circle-fill"></i>`
      }</td>
      <td>${
        currentItem.sterilized
          ? `<i class="bi bi-check-circle-fill"></i>`
          : `<i class="bi bi-x-circle-fill"></i>`
      }</td>
      <td>${currentItem.getDateString()}</td>
      ${
        page == "Search Pet"
          ? ""
          : `<td class="bmi">?</td>
      <td>${
        page == "Pet Management"
          ? `<button onclick="deleteFunction('${currentItem.id}')" type="button" class="btn btn-danger">Delete</button>`
          : `<button onclick="editFunction('${currentItem.id}')" type="button" class="btn btn-warning">Edit</button>`
      }
        
      </td>`
      }
      
    </tr>`;

      tableContent += rowContent;
    }

    document.getElementById("tbody").innerHTML = tableContent;
  }
};

// Render breedList
let render;

const PET_LIST = "PET_LIST";
const BREED_LIST = "BREED_LIST";

// biến dùng để trữ dữ liệu dạng array of objects
let petList = [];
let breedList = [];

// get  and validate data from local
let petDataJson = localStorage.getItem(PET_LIST);
if (petDataJson) {
  let rawPetData = JSON.parse(petDataJson);

  petList = rawPetData.map((item) => {
    return new Pet(
      item.id,
      item.name,
      item.age,
      item.type,
      item.weight,
      item.length,
      item.color,
      item.breed,
      item.vaccinated,
      item.dewormed,
      item.sterilized,
      new Date()
    );
  });

  renderList(currentPage, petList);
}
let breedDataJson = localStorage.getItem(BREED_LIST);
if (breedDataJson) {
  let rawBreedData = JSON.parse(breedDataJson);

  breedList = rawBreedData.map((item) => {
    return new Breed(item.type, item.breed);
  });
}

// render data based on page
if (currentPage == "Breed Management") {
  if (breedDataJson) {
    renderList(currentPage, breedList);
  }
} else {
  if (petDataJson) {
    renderList(currentPage, petList);
  }
}

let savePetListToLocalStorage = () => {
  let listJson = JSON.stringify(petList);
  localStorage.setItem(PET_LIST, listJson);
};

let saveBreedListToLocalStorage = () => {
  let listJson = JSON.stringify(breedList);
  localStorage.setItem(BREED_LIST, listJson);
};
