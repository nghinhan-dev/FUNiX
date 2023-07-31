import { json } from "react-router-dom";

export async function loader({ params }) {
  const id = params.bookId;

  const res = await fetch(`http://localhost:3000/${id}`);

  if (!res.ok) {
    throw json(
      { message: "Couldnot post new book to backend" },
      { status: 500 }
    );
  }

  const resData = await res.json();
  return resData;
}
