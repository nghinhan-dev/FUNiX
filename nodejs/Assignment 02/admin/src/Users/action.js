export async function action({ request }) {
  const formInput = await request.formData();
  const formData = {
    username: formInput.get("username"),
    password: formInput.get("password"),
    confirm: formInput.get("confirm"),
    fullName: formInput.get("fullname"),
    phoneNumber: formInput.get("phone"),
    email: formInput.get("email"),
    isAdmin: formInput.get("isAdmin") === "on" ? true : false,
  };
  const notify = {};
  console.log("formData:", formData);

  if (formData.password !== formData.confirm) {
    notify.unmatch =
      "Mismatched passwords. Please check and re-enter your password.";
    notify.confirmError = formData.confirm;

    return notify;
  }

  const res = await fetch("http://localhost:5000/admin_create_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    notify.error = "Account already existed!";
    return notify;
  }

  notify.success = await res.json();

  return notify;
}
