const API_KEY = "a41e04665d0188e4b15ad25b23931766";
const TOKEN = "8qlOkxz4wq";

const requests = {
  fetchTrending: `/trending/?token=${TOKEN}`,
  fetchTopRated: `/top-rate/?token=${TOKEN}`,
  fetchActionMovies: `/discover/?token=${TOKEN}&genre=28`,
  fetchComedyMovies: `/discover/?token=${TOKEN}&genre=35`,
  fetchHorrorMovies: `/discover/?token=${TOKEN}&genre=27`,
  fetchRomanceMovies: `/discover/?token=${TOKEN}&genre=10749`,
  fetchDocumentaries: `/discover/?token=${TOKEN}&genre=99`,
};

export async function loader() {
  const fetchNetflixOriginals = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123&with_original_language=en&language=en-US`
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    return data.results;
  };

  const promises = Object.values(requests).map(async (endpoint) => {
    const url = `http://localhost:3000/movies${endpoint}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movies = await response.json();

    return movies;
  });

  const results = await Promise.allSettled(promises, fetchNetflixOriginals());

  const data = results.reduce(
    (acc, result, index) => {
      if (result.status === "fulfilled") {
        const key = Object.keys(requests)[index];
        acc[key] = result.value.result;
      } else {
        console.error(result.reason);
      }
      return acc;
    },
    { fetchNetflixOriginals: results[0].value.result }
  );

  return data;
}
