const myCountry = {
  country: "VietNam",
  capital: "Hà Nội",
  population: 97,
  neighbours: ["Laos", "Campodia", "China"],
  isIsland: function () {
    let result = this.neighbours.length > 0 ? true : false;

    return result;
  },
  desPol: function () {
    let worldPopulation = 7900;
    let result = (this.population / worldPopulation) * 100;

    return Math.round((result + Number.EPSILON) * 100) / 100;
  },
};

// console.log(
//   `${myCountry.country} has ${myCountry.population} million finnish-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`
// );

// console.log(myCountry.desPol());

// for (let index = 0; index < 50; index++) {
//   console.log(`Voter number ${index + 1} is currently voting`);
// }

const listOfNeigh = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

for (let index = 0; index < listOfNeigh.length; index++) {
  // while làm code phức tạp hơn
  if (listOfNeigh[index].length > 1) {
    for (let i = 1; i < listOfNeigh[index].length; i++) {
      console.log(listOfNeigh[index][i]);
    }
  }
}
