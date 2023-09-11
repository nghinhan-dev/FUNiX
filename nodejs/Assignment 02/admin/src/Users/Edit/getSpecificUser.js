export async function loader({ params }) {
  const id = params.userId;
  const res = fetch(`http://localhost:5000/user/${id}`);

  return res;
}
