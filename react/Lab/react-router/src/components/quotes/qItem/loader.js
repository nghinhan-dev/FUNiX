export async function loader({ params }) {
  const id = params.qouteId;
  const response = await fetch(
    `https://react-funix-default-rtdb.asia-southeast1.firebasedatabase.app/qoute.json?orderBy="id"&equalTo="${id}" `
  );

  if (!response.ok) {
    console.log("Somethings went wrong");
  } else {
    return response;
  }
}
