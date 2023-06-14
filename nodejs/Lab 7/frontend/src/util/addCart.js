import { json, redirect } from "react-router-dom";

export async function action({ request }) {
  let formData = await request.formData();
  let newItem = {
    id: formData.get("id"),
    price: formData.get("price"),
  };

  const res = await fetch("http://localhost:3000/add-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });

  if (!res.ok) {
    throw json(
      { message: "Couldnot post new book to backend" },
      { status: 500 }
    );
  }

  return redirect("/");
}
