export async function loader() {
  const response = await fetch(
    `https://react-funix-default-rtdb.asia-southeast1.firebasedatabase.app/qoute.json`
  );

  if (!response.ok) {
    console.log("Somethings went wrong");
  } else {
    return response;
  }
}
