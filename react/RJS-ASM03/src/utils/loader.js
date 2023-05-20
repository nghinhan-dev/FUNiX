export async function loader() {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );

  setTimeout(() => {}, 2000);

  if (!response.ok) {
    throw new Error("Couldn't fetch data");
  }

  return response;
}
