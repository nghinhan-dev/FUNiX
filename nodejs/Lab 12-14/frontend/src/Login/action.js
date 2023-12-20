export async function loginAction({ request }) {
  const { intent, ...data } = Object.fromEntries(await request.formData());

  try {
    let res;

    if (intent === "login") {
      res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }

    if (intent === "signup") {
      res = await fetch("http://localhost:3000/sigup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
    }

    if (!res.ok) {
      const result = await res.json();

      throw new Error(result.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
    return null;
  }
}
