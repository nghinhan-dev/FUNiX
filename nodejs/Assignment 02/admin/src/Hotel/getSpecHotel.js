export async function loader({ params }) {
  const id = params.hotelId;
  const res = fetch(`http://localhost:5000/hotel/${id}`);

  return res;
}
