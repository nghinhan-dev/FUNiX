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
