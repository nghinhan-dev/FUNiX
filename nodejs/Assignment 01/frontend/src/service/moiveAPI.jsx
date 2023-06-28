const API_KEY = "a41e04665d0188e4b15ad25b23931766";

// const requests = {
//   fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123&with_original_language=en`,
//   fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
//   fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
//   fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
//   fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
//   fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
//   fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
//   fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
//   fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
// };

// export async function getData() {
//   const endpoints = Object.values(requests).filter(
//     (endpoint) => !endpoint.includes("search/movie")
//   );

//   const promises = Object.values(endpoints).map(async (endpoint) => {
//     const url = `https://api.themoviedb.org/3${endpoint}&language=en-US`;
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return response.json();
//   });

//   const results = await Promise.allSettled(promises);

//   const data = results.reduce((acc, result, index) => {
//     if (result.status === "fulfilled") {
//       const key = Object.keys(requests)[index];
//       acc[key] = result.value.results;
//     } else {
//       console.error(result.reason);
//     }
//     return acc;
//   }, {});

//   return data;
// }

export async function searchMovie(query) {
  const url = `
https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results;
}
