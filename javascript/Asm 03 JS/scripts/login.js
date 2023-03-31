function getLoginForm() {
  let id = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;

  // Return id = username && password take form Login form
  return { id, password };
}

function login() {
  let id = getLoginForm().id;

  // check if username exist
  let index = userList.findIndex((user) => user.userName == id);
  if (index == -1) {
    Swal.fire({
      icon: "error",
      title: "Your account doesn't exist",
    });

    return;
  }

  // then compare password
  if (getLoginForm().password !== userList[index].password) {
    Swal.fire({
      icon: "error",
      title: " Password",
      text: "Incorrect password!!",
    });

    return;
  }

  Swal.fire({
    icon: "success",
    title: `Welcome ${userList[index].userName}!`,
  });

  currentUser.push(userList[index]);
  saveCurrentUser();

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
}
