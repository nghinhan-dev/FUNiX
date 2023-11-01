export async function getTrans({ params }) {
  const username = params.username;
  console.log("username:", username);
  try {
    const res = await fetch(`http://localhost:5000/${username}/transaction`);

    if (!res.ok) throw new Error(res.message);

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}
