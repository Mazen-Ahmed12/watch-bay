const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "Content-Type": "application/json;charset=utf-8",
};

export const tmdbAPI = {
  // Get trending movies
  getTrending: async (timeWindow = "day") => {
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
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`,
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
    const data = await response.json();
    data.results = data.results.filter(
      m =>
        (m.original_language === "en" || m.original_language === "ja") &&
        (m.vote_count || 0) >= 100 &&
        !m.adult // optional: remove TMDB-marked adult titles
    );
    return data;
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

  getGenres: async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`, { headers });
    return await res.json();
  },

  // Discover movies with filters applied
  discoverMovies: async ({ page = 1, category, year, rating, runtime }) => {
    const params = new URLSearchParams({
      api_key: API_KEY,
      page,
    });

    if (category) params.append("with_genres", category);

    if (year) {
      const [startYear, endYear] = year.split(" - ").map(Number);
      params.append("primary_release_date.gte", `${startYear}-01-01`);
      params.append("primary_release_date.lte", `${endYear}-12-31`);
    }

    // ✅ Rating mapping logic
    if (rating) {
      const rateNum = Number(rating);
      let minVote = 0;
      let maxVote = 10;

      switch (rateNum) {
        case 1:
          minVote = 0;
          maxVote = 1.9;
          break;
        case 2:
          minVote = 2.0;
          maxVote = 3.9;
          break;
        case 3:
          minVote = 4.0;
          maxVote = 5.9;
          break;
        case 4:
          minVote = 6.0;
          maxVote = 7.9;
          break;
        case 5:
          minVote = 8.0;
          maxVote = 10.0;
          break;
        default:
          break;
      }

      params.append("vote_average.gte", minVote);
      params.append("vote_average.lte", maxVote);
    }

    if (runtime) {
      const [min, max] = runtime.split(" - ").map(Number);
      if (!isNaN(min)) params.append("with_runtime.gte", min * 60);
      if (!isNaN(max)) params.append("with_runtime.lte", max * 60);
    }

    const res = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`, { headers });
    const data = await res.json();

    // Filter languages and vote count (basic filtering only)
    const filteredResults = data.results.filter(
      m =>
        (m.original_language === "en" || m.original_language === "ja") &&
        (m.vote_count || 0) >= 100
    );

    // For performance, return basic movie data without additional API calls
    // The detailed information can be fetched when needed for individual movies
    return { ...data, results: filteredResults };
  },
  
   getCounts: async () => {
    try {
      // Fetch total movies
      const moviesRes = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}`,
        { headers }
      );
      const moviesData = await moviesRes.json();

      // Fetch genres
      const genresRes = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
        { headers }
      );
      const genresData = await genresRes.json();

      return {
        totalMovies: moviesData?.total_results ?? 0,
        totalCategories: genresData?.genres?.length ?? 0,
        genres: genresData?.genres ?? []
      };
    } catch (err) {
      console.error("getCounts error:", err);
      return { totalMovies: 0, totalCategories: 0, genres: [] };
    }
  }

};

