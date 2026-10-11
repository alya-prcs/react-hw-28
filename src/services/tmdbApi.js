const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_KEY;

async function request(path, params = {}) {
  const query = new URLSearchParams({
    api_key: API_KEY,
    language: 'uk-UA',
    ...params,
  });
  const response = await fetch(`${BASE_URL}${path}?${query}`);
  if (!response.ok) {
    throw new Error(`Помилка запиту: ${response.status}`);
  }
  return response.json();
}

export const getTrending = () => request('/trending/movie/day');
export const searchMovies = (query) => request('/search/movie', { query });
export const getMovieDetails = (id) => request(`/movie/${id}`);
export const getMovieCredits = (id) => request(`/movie/${id}/credits`);
export const getMovieReviews = (id) =>
  request(`/movie/${id}/reviews`, { language: 'en-US' });

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w300';
