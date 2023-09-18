export async function getUsers() {
  try {
    const res = await fetch("http://localhost:5000/get_users");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function addUser({ request }) {
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

export async function getSpecificUser({ params }) {
  const id = params.userId;
  const res = fetch(`http://localhost:5000/user/${id}`);

  return res;
}

export async function updateUser({ params, request }) {
  const id = params.userId;

  const notify = {};
  const formInput = await request.formData();

  const formData = {
    username: formInput.get("username"),
    password: formInput.get("password"),
    fullName: formInput.get("fullName"),
    phoneNumber: formInput.get("phoneNumber"),
    email: formInput.get("email"),
    isAdmin: formInput.get("isAdmin") === "on" ? true : false,
  };

  const res = await fetch(`http://localhost:5000/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  notify.success = await res.json();

  return notify;
}
