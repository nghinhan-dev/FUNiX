// 3.1
// "9" - "5";

// "19" - "13" + "17";

// "19" - "13" + 17;

// "123" < 57;

// 5 + 6 + "4" + 9 - 4 - 2;
console.log("123" == 57);

const prompt = require("prompt-sync")();

// let numNeighbours = prompt(
//   "How many neighbor countries does your country have?"
// );

// numNeighbours *= 1;
// // chuyển string thành number

// let result =
//   numNeighbours == 0 ? "no one" : numNeighbours > 1 ? "more than 1" : "only 1";

// chuyển == thành === thì sẽ ra only 1 bởi vì string != number

let country = prompt("Country ?: ");
let population = prompt("Population (only write number) ?: ");
let isIsland = prompt("Is an island ?: true/false ");
isIsland == true ? (isIsland = false) : (isIsland = true);

population < 50 && isIsland
  ? console.log(`Should live in ${country}`)
  : console.log(`${country} doesn't meet your criteria`);

let language = prompt("Language ?: ");
switch (language) {
  case "Chinese":
    console.log("MOST number of native speakers");
    break;
  case "Spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "English":
    console.log("3rd place");
    break;
  case "Chinese":
    console.log("Number 4");
    break;
  case "Arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too!");
    break;
}
