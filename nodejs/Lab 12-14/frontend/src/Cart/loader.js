export async function loader() {
  const res = await fetch("http://localhost:3000/cart");

  if (res.ok) {
    const resData = await res.json();
    return resData;
  }
}
