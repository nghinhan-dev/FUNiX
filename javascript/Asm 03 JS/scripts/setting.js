let getSettingForm = () => {
  let pageSize = document.getElementById("input-page-size").value * 1;
  let category = document.getElementById("input-category").value;

  return { pageSize, category };
};

function getSettingFormCurrentUser() {
  document.getElementById("input-page-size").value = currentUser[0].pageSize;
  document.getElementById("input-category").value = currentUser[0].category;
}
getSettingFormCurrentUser();

function setting() {
  // update currentUser
  currentUser[0] = {
    ...currentUser[0],
    category: getSettingForm().category,
    pageSize: getSettingForm().pageSize,
  };

  saveCurrentUser();
  // update userList
  let index = userList.findIndex(
    (user) => user.userName === currentUser[0].userName
  );
  userList.splice(index, 1);
  userList.push(currentUser[0]);
  saveLocalStorage();

  Swal.fire({
    icon: "success",
    title: `Saved settings!`,
  });
}

// Render HomePage at first loading
function renderHomePage() {
  if (currentUser.length > 0) {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("main").style.display = "block";
  } else {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("main").style.display = "none";
  }
}

renderHomePage();
