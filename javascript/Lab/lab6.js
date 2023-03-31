const C_DEGREE = [17, 12, 21];

function printForcast(arr) {
  for (let index = 0; index < arr.length; index++) {
    console.log(
      `${arr[index]}ºC in ${index + 1} ${index == 0 ? "day" : "days"}`
    );
  }
}

console.log(printForcast(C_DEGREE));
