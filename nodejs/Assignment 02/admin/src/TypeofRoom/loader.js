export async function loader() {
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
