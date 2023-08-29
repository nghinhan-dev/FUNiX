export async function loader() {
  try {
    const res = await fetch("http://localhost:5000/hotelDB");

    if (!res.ok) {
      throw new Error("Cannnot fetch database!");
    }
    const data = await res.json();
    // return res;

    const result = {
      city: data.cityResult,
      byProperty: data.byPropertyResult,
      highestRatingResult: data.highestRatingResult,
    };

    return result;
  } catch (error) {
    console.log("error:", error);
  }
}
