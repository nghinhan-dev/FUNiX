export async function loader({ params }) {
  try {
    const hotelId = params.hotelId;

    const res = await fetch(`http://localhost:5000/book/${hotelId}`);

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}
