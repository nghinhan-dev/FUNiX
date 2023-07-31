import { json, redirect } from "react-router-dom";

export async function action({ request }) {
  const data = await request.formData();
  const newBookData = {
    title: data.get("title"),
    imageUrl:
      "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
    price: data.get("price"),
    description: data.get("desc"),
  };

  const res = await fetch("http://localhost:3000/add-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBookData),
  });

  if (!res.ok) {
    throw json(
      { message: "Couldnot post new book to backend" },
      { status: 500 }
    );
  }

  return redirect("/");
}
