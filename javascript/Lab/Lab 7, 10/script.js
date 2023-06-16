let random_number = Math.floor(Math.random() * 20) + 1;
let high_score = 0;
let life_point = 20;

let highscore = (num) => {
  if (num > high_score) {
    high_score = num;
    document.querySelector(".highscore").innerText = high_score;
  }
};

let minusScore = () => {
  life_point--;
  document.querySelector("score").innerText = life_point;

  if (life_point == 0) {
    document.getElementById("message").innerText = "GAME OVER!";
    document.getElementById("checkNum");
  }
};

let check = () => {
  let check_number = document.getElementById("checkNum").value * 1;

  console.log("random_number:", random_number);
  let message =
    check_number == random_number
      ? "Correct"
      : check_number < random_number
      ? "Too low!"
      : "Too high!";

  // Updating the message on browser
  message == "Correct"
    ? (document.getElementById("body").style.backgroundColor = "#60b347")
    : (document.getElementById("body").style.backgroundColor = "#222");
  // Updating the highscore / life on browser
  message == "Correct" ? highscore(life_point) : minusScore();
  message == "Correct"
    ? (document.getElementById("ranNum").innerText = check_number)
    : "";

  document.getElementById("message").innerText = message;
};

let again = () => {
  random_number = Math.floor(Math.random() * 20) + 1;
  life_point = 20;
  document.getElementById("score").innerText = life_point;
  document.getElementById("body").style.backgroundColor = "#222";

  document.getElementById("ranNum").innerText = "?";
  document.getElementById("myFrom").reset();
  document.getElementById("message").innerText = "Start guessing...";
};
