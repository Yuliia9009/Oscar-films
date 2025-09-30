import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_THEMOVIEDB_KEY;
const LANG = "ru-RU";

const http = axios.create({
  baseURL: API_URL,
  params: { api_key: API_KEY, language: LANG },
});

// --- Фильмы ---
export async function fetchPopular(page = 1) {
  const { data } = await http.get("/movie/popular", { params: { page } });
  return data; // {page, results, total_pages, total_results}
}

export async function searchMovies(query, page = 1) {
  const { data } = await http.get("/search/movie", {
    params: { query, page, include_adult: false },
  });
  return data;
}

export async function getMovieDetails(id) {
  const { data } = await http.get(`/movie/${id}`, {
    params: { append_to_response: "videos,images" },
  });
  return data;
}

export async function getMovieCredits(id) {
  const { data } = await http.get(`/movie/${id}/credits`);
  return data; // { cast: [...], crew: [...] }
}

export async function discoverMovies(params = {}) {
  // params: { with_genres, primary_release_year, sort_by, page, include_adult }
  const { data } = await http.get("/discover/movie", { params });
  return data;
}

// --- Жанры ---
export async function getGenres() {
  const { data } = await http.get("/genre/movie/list");
  return data.genres; // [{id, name}]
}

// --- Персоны ---
export async function getPersonDetails(id) {
  const { data } = await http.get(`/person/${id}`);
  return data;
}

export async function getPersonMovieCredits(id) {
  const { data } = await http.get(`/person/${id}/movie_credits`);
  return data; // { cast: [...], crew: [...] }
}

export function posterUrl(path, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/no-poster.png";
}

export function profileUrl(path, size = "w185") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/no-avatar.png";
}
