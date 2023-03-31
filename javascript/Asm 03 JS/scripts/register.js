// GET DATA FROM FORM
let getFormInput = () => {
  let firstName = document.getElementById("input-firstname").value;
  let lastName = document.getElementById("input-lastname").value;
  let userName = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;
  let confirmPassword = document.getElementById("input-password-confirm").value;

  let user = new User(firstName, lastName, userName, password);
  return { user, confirmPassword };
};

// VALIDATE INPUT
let validateInput = (newUser, confirmPw) => {
  if (newUser.firstName == "") {
    Swal.fire({
      icon: "error",
      title: "First Name",
      text: "Cannot be empty!",
    });
    return false;
  }

  if (newUser.lastName == "") {
    Swal.fire({
      icon: "error",
      title: "Last Name",
      text: "Cannot be empty!",
    });
    return false;
  }

  if (newUser.userName == "") {
    Swal.fire({
      icon: "error",
      title: "User Name",
      text: "Cannot be empty!",
    });
    return false;
  }

  let index = userList.findIndex((user) => user.userName == newUser.userName);
  if (index != -1) {
    Swal.fire({
      icon: "error",
      title: "User Name",
      text: "Username is unique!",
    });

    return false;
  }

  if (newUser.password == "") {
    Swal.fire({
      icon: "error",
      title: "Password",
      text: "Cannot be empty!",
    });
    return false;
  }

  if (newUser.password.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Password",
      text: "Minimum 8 characters!",
    });
    return false;
  }

  if (newUser.password !== confirmPw) {
    Swal.fire({
      icon: "error",
      title: "Confirm Password",
      text: "Confirm Password is not matched",
    });
    return false;
  }

  return true;
};

// REGISTER
let registerBtn = document.getElementById("btn-register");
registerBtn.addEventListener("click", () => {
  console.log(1);
  let newUser = getFormInput().user;
  let confirmPw = getFormInput().confirmPassword;

  if (validateInput(newUser, confirmPw)) {
    Swal.fire({
      icon: "success",
      title: "Account",
      text: "Created",
    });
    userList.push(newUser);
    saveLocalStorage();
    document.getElementById("regisForm").reset();

    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  }
});
