function callback() {
  moveBox();
  requestAnimationFrame(callback());
  // setTimeout(callback(), 0);
}

let box = document.querySelector(".box");
let x = 0;

function moveBox() {
  x += 0.004;
  box.style.top = `${x}px`;
}

callback();
