// Render HomePage at first loading
function renderHomePage() {
  if (currentUser.length > 0) {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    document.getElementById("welcome-message").innerText = `
    Welcome ${currentUser[0].userName}!`;
  } else {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("main-content").style.display = "none";
  }
}

renderHomePage();

// LogOut

function logOut() {
  localStorage.removeItem(CURRENT_USER);
  currentUser = JSON.parse(localStorage.getItem(CURRENT_USER)) || [];
  renderHomePage();
}
