export async function loader({ params }) {
  const hotelId = params.hotelId;

  const res = await fetch(`http://localhost:5000/hotel/${hotelId}`);

  return res;
}
