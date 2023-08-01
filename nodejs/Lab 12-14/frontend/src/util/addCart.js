import { json, redirect } from "react-router-dom";

export async function action({ request }) {
  let formData = await request.formData();
  let intent = formData.get("intent");
  let cartitem = {
    id: formData.get("id"),
    title: formData.get("title"),
    price: formData.get("price"),
  };

  if (intent === "add") {
    const res = await fetch("http://localhost:3000/add-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartitem),
    });

    if (!res.ok) {
      throw json(
        { message: "Couldnot post new book to backend" },
        { status: 500 }
      );
    }
  }

  if (intent === "del") {
    const res = await fetch("http://localhost:3000/delete-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartitem),
    });

    if (!res.ok) {
      throw json(
        { message: "Couldnot post new book to backend" },
        { status: 500 }
      );
    }
  }

  if (intent === "create-order") {
    const res = await fetch("http://localhost:3000/create-order", {
      method: "POST",
    });

    if (!res.ok) {
      throw json(
        { message: "Couldnot post new book to backend" },
        { status: 500 }
      );
    }

    return redirect("/checkout");
  }
  return redirect("/cart");
}
