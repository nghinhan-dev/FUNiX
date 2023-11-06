export async function getTrans() {
  try {
    const res = await fetch("http://localhost:5000/transactions");

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function getSpeicifcTrans({ params }) {
  const id = params.transID;
  const res = fetch(`http://localhost:5000/transactions/${id}`);

  return res;
}
