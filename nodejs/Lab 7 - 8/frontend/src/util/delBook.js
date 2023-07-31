import { redirect } from "react-router-dom";

export async function action({ params }) {
  const id = params.bookId;

  try {
    const res = await fetch(`http://localhost:3000/delete?id=${id}`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(`${res.message}`);
    }
  } catch (error) {
    console.log("error:", error);
  }

  return redirect("/");
}
