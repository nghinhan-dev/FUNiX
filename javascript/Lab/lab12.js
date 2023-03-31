let juliaArr = [3, 5, 2, 12, 7];
let kateArr = [4, 1, 15, 8, 3];

let checkDogs = (arr1, arr2) => {
  let updateArr = arr1.slice(1, 4);
  let arr = updateArr.concat(arr2);

  arr.forEach((age, index) => {
    age > 3
      ? console.log(
          `Dog number ${index + 1} is an adult, and is ${age} years old`
        )
      : console.log(`Dog number ${index + 1} is still a puppy`);
  });
};

checkDogs(juliaArr, kateArr);
//  [ 5, 2, 12] [4, 1, 15, 8, 3]
