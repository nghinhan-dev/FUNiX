export async function orderLoader() {
  const res = await fetch("http://localhost:3000/get-orders");

  if (res.ok) {
    const resData = await res.json();
    return resData;
  }
}
