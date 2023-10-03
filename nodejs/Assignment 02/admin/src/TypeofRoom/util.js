import { toastError, toastSuccess } from "../util/toast";

export async function getRoomTypes() {
  try {
    const res = await fetch("http://localhost:5000/get_type_rooms");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function getSpecificType({ params }) {
  const id = params.typeId;
  const res = fetch(`http://localhost:5000/type/${id}`);

  return res;
}

export async function updateType({ params, request }) {
  const id = params.typeId;

  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch(`http://localhost:5000/type/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (response.errors) {
      throw new Error(response.errors[0]);
    }

    return toastSuccess("Updated");
  } catch (error) {
    return toastError(error?.message ?? "Lost connect to server");
  }
}

export async function addType({ request }) {
  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch(`http://localhost:5000/add_type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const respone = await res.json();

    if (res.status === 400) {
      return toastError(respone.errors[0]);
    }

    return toastSuccess(respone.statusText);
  } catch (error) {
    console.log("error:", error);
  }
}
