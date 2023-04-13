let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let closeBtn = document.querySelector(".close-modal");

// show modal
let btnShow = document.querySelectorAll(".show-modal");
btnShow.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});

// close modal
let hiddenThings = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

closeBtn.addEventListener("click", () => {
  hiddenThings();
});

overlay.addEventListener("click", () => {
  hiddenThings();
});

// key event listener
document.addEventListener("keydown", (pressKey) => {
  pressKey.key === "Escape" && !modal.classList.contains("hidden")
    ? hiddenThings()
    : null;
});
