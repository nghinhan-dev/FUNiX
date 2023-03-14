// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
let menu = document.getElementById("menu-bar");
let bar = document.querySelectorAll(".bar");

sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");

  menu.classList.toggle("active");
  bar.forEach((item) => {
    item.classList.remove("no-animation");
  });
});
