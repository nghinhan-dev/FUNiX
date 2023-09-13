export async function loader({ params }) {
  const id = params.typeId;
  const res = fetch(`http://localhost:5000/type/${id}`);

  return res;
}
