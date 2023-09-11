export async function action({ params, request }) {
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
