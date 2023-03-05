function descCountry(country, population, capicalCity) {
  return `${country} has ${population} million people and its capital city is ${capicalCity}`;
}

console.log(descCountry("Finland", 6, "Helsinki"));

function percentWorldver1(population) {
  let worldPopulation = 7900;
  let result = (population / worldPopulation) * 100;

  return `${
    Math.round((result + Number.EPSILON) * 100) / 100
  } percent of world's population`;
}

console.log(percentWorldver1(97));

let calPercent = (population) => {
  let worldPopulation = 7900;
  let result = (population / worldPopulation) * 100;

  return Math.round((result + Number.EPSILON) * 100) / 100;
};

let descPol = (country, population) => {
  let worldPopulation = 7900;
  let result = (population / worldPopulation) * 100;

  return `${country} has ${result} percent of world's population`;
};

let polArr = [38.25, 97.27, 1441, 5.74];
let percentArr = [];

polArr.length == 4 ? console.log(true) : console.log(false);

for (let index = 0; index < polArr.length; index++) {
  percentArr.push(calPercent(polArr[index]));
}

console.log(percentArr);

// Lab 4.6
// array.pop() method
// array.inclues("German") return 'Probably not a central European country :D';

// let indexOfSweden = items.indexOf("Sweden");

// if (index !== -1) {
//   items[index] = "Republic Sweden";
// }
