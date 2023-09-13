export async function getRooms() {
  try {
    const res = await fetch("http://localhost:5000/get_rooms");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function updateRoom({ params, request }) {
  const id = params.roomId;

  const notify = {};
  const data = Object.fromEntries(await request.formData());

  const res = await fetch(`http://localhost:5000/room/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  notify.success = await res.json();

  return notify;
}

export async function getSpecRoom({ params }) {
  const id = params.roomId;
  const res = fetch(`http://localhost:5000/room/${id}`);

  return res;
}
