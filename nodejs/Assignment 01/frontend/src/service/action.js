export async function searchAction({ request }) {
  const { search } = Object.fromEntries(await request.formData());
  const encodedParams = encodeURI(search);

  try {
    const res = await fetch(
      `http://localhost:3000/movies/search/?token=8qlOkxz4wq&query=${encodedParams}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    return res;
  } catch (error) {
    console.log("error:", error);
  }
}
