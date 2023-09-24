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
  const id = params.userId;

  const notify = {};
  const data = Object.fromEntries(await request.formData());
  console.log("data:", data);

  const res = await fetch(`http://localhost:5000/type/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  notify.success = await res.json();

  return notify;
}
