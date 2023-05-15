import { json, redirect } from "react-router-dom";

export async function action({ request }) {
  const data = await request.formData();
  const quoteData = {
    author: data.get("author"),
    content: data.get("content"),
    id: data.get("id"),
  };

  const errors = {};

  if (quoteData.author.length < 5) {
    errors.author = "Min 5 characters";
  }
  if (quoteData.content.length < 20) {
    errors.content = "Min 20 characters";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const response = await fetch(
    `https://react-funix-default-rtdb.asia-southeast1.firebasedatabase.app/qoute.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quoteData),
    }
  );

  if (!response.ok) {
    console.log("Wrong");
    throw json({ message: "Couldnt save quote" });
  }

  return redirect("/all");
}
