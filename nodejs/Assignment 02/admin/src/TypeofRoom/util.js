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
