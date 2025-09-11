// TMDB API base URL
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// Image Base URLs
export const image500 = 'https://image.tmdb.org/t/p/w500';
export const image342 = 'https://image.tmdb.org/t/p/w342';
export const image185 = 'https://image.tmdb.org/t/p/w185';
// For when the poster path is not available
export const noPoster = 'https://via.placeholder.com/500x750?text=No+Poster';

// Fallback images
export const noBackdrop = 'https://via.placeholder.com/1280x720?text=No+Backdrop';

// YouTube base URL
export const youtubeUrl = 'https://www.youtube.com/watch?v=';
