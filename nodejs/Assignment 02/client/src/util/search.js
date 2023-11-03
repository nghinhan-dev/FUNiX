export async function search(searchContext) {
  try {
    const res = await fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchContext),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("error:", error);
  }
}
