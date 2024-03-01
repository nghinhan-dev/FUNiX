import { toastSuccess, toastError } from "../util/toast";
import { redirect } from "react-router-dom";

export async function getSpecificHotel({ params }) {
  const id = params.hotelId;
  const res = fetch(`http://localhost:5000/hotel/${id}`);

  return res;
}

export async function getHotel() {
  try {
    const res = await fetch("http://localhost:5000/hotels");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function addHotel({ request }) {
  const data = Object.fromEntries(await request.formData());
  console.log("data:", data);

  try {
    const res = await fetch("http://localhost:5000/add_hotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const notify = await res.json();
    if (!res.ok) {
      toastError(notify.errors[0]);
    }

    return notify;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function updateHotel({ params, request }) {
  const id = params.hotelId;

  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch(`http://localhost:5000/hotel/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.errors) {
      throw new Error(response.errors[0]);
    }

    // toastSuccess("Updated");
    // return redirect("/hotel");
    return toastSuccess("Updated");
  } catch (error) {
    return toastError(error?.message ?? "Lost connect to server");
  }
}

export async function delHotel({ params }) {
  const id = params.hotelId;

  try {
    const res = await fetch(`http://localhost:5000/hotel/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { error } = await res.json();
    if (error) {
      toastError(error);
      return redirect("/hotel");
    }

    toastSuccess("Updated");
    return redirect("/hotel");
  } catch (error) {
    toastError(error?.message ?? "Lost connect to server");
  }
}
