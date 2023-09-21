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
  const notify = {};
  const data = Object.fromEntries(await request.formData());

  try {
    const res = await fetch("http://localhost:5000/add_hotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    notify.success = await res.json();
    return notify;
  } catch (error) {
    console.log("error:", error);
  }
}
