const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const headers = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'Content-Type': 'application/json;charset=utf-8',
};

export const tmdbAPI = {
  // Get trending movies
  getTrending: async (timeWindow = 'day') => {
    const response = await fetch(
      `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`,
      { headers }
    );
    return await response.json();
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,similar`,
      { headers }
    );
    return await response.json();
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
      { headers }
    );
    return await response.json();
  },

  // Get popular movies
  getPopularMovies: async (page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
      { headers }
    );
    return await response.json();
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1) => {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`,
      { headers }
    );
    return await response.json();
  },

  // Get movie images
  getMovieImages: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`,
      { headers }
    );
    return await response.json();
  },

  // Get movie credits
  getMovieCredits: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
      { headers }
    );
    return await response.json();
  },

  // Get movie videos
  getMovieVideos: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
      { headers }
    );
    return await response.json();
  },

  // Get movie reviews
  getMovieReviews: async (movieId) => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
      { headers }
    );
    return await response.json();
  },
};
