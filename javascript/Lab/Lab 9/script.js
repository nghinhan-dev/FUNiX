// player 0
let player0 = document.querySelector(".player--0");
let score0 = document.getElementById("score--0").innerText * 1;

// player 1
let player1 = document.querySelector(".player--1");
let score1 = document.getElementById("score--1").innerText * 1;

// game state
let diceImg = document.querySelector(".dice");
let currentScore = 0;
let currentPlayer = 0;

// buttons
let rollBtn = document.querySelector(".btn--roll");
let holdBtn = document.querySelector(".btn--hold");
let newBtn = document.querySelector(".btn--new");

// player state
let playerActive = () => {
  if (player0.classList.contains("player--active")) {
    currentPlayer = 0;
  } else {
    currentPlayer = 1;
  }
};

let switchPlayer = () => {
  if (currentPlayer == 0) {
    player0.classList.remove("player--active");
    player1.classList.add("player--active");
    playerActive();
  } else {
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
    playerActive();
  }
};
playerActive();

// roll dice
diceImg.classList.add("hidden");

rollBtn.addEventListener("click", () => {
  diceImg.classList.remove("hidden");

  let diceValue = Math.floor(Math.random() * 6) + 1;
  diceImg.src = `dice-${diceValue}.png`;

  diceValue != 1
    ? addCurrentScore(currentPlayer, diceValue)
    : removeCurrentScore(currentPlayer);
});

// current function
let removeCurrentScore = (player) => {
  if (player == 0) {
    currentScore = 0;
    document.getElementById("current--0").innerText = 0;
    switchPlayer();
  } else {
    currentScore = 0;
    document.getElementById("current--1").innerText = 0;
    switchPlayer();
  }
};

let addCurrentScore = (player, score) => {
  currentScore += score;
  player == 0
    ? (document.getElementById("current--0").innerText = currentScore)
    : (document.getElementById("current--1").innerText = currentScore);
};

// hold function
holdBtn.addEventListener("click", () => {
  if (currentPlayer == 0) {
    score0 += currentScore;
    currentScore = 0;
    document.getElementById("score--0").innerText = score0;
    document.getElementById("current--0").innerText = 0;
    winnerCheck(score0);
  } else {
    score1 += currentScore;
    currentScore = 0;
    document.getElementById("score--1").innerText = score1;
    document.getElementById("current--1").innerText = 0;
    winnerCheck(score1);
  }
  switchPlayer();
});

// winner valid
let winnerCheck = (score) => {
  if (score >= 50) {
    currentPlayer == 0
      ? console.log("Player 1 is the winner!")
      : console.log("Player 2 is the winner!");
  }
};

// new game
newBtn.addEventListener("click", () => {
  diceImg.classList.add("hidden");
  currentPlayer = 1;
  switchPlayer();

  currentScore = 0;
  score0 = 0;
  document.getElementById("score--0").innerText = score0;
  score1 = 0;
  document.getElementById("score--1").innerText = score1;

  document.getElementById("current--0").innerText = currentScore;
  document.getElementById("current--1").innerText = currentScore;
});
