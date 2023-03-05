// 2.1
let isIsLand = true;
let country = "vietnam";
let language;

// console.log(isIsLand, " ", country, " ", language);

// 2.2

language = "vietnamese";
// Answer 2.2.2 : sẽ không thay đổi được giá trị của khai báo const nhưng có thể thay đổi giá trị bên trong nó, array, object

let population = 97;
// let population = 13;
// let population = 130;
console.log("population/2 =", population / 2);
console.log("(population + 1)/2 =", (population + 1) / 2);

let phan_lan_pol = 6;

phan_lan_pol > population
  ? console.log("phan_lan_pol > population")
  : console.log("phan_lan_pol < population");

let desc = `${country} and its ${population} million people speak ${language}`;

population > 33
  ? console.log(`${country}'s population is above average'`)
  : console.log(
      `${country}'s population is ${33 - population} mil below average'`
    );
