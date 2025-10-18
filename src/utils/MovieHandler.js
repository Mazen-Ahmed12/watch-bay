import { useGenres, useMovieDetails } from "api/queries";
import { useEffect, useState } from "react";

/**
 * Custom hook for handling movie data in different contexts (favorites vs dashboard queue)
 * @param {Object} options - Configuration options
 * @param {string} options.type - 'favorites' or 'dashboard'
 * @param {string} options.movieId - Movie ID to fetch details for
 * @param {Function} options.onMoviesUpdate - Callback when movies are updated
 * @returns {Object} - { movies, isLoading, error }
 */
export const useMovieHandler = ({ type = 'favorites', movieId, onMoviesUpdate }) => {
  const [movies, setMovies] = useState([]);
  const { data: genresData } = useGenres();
  const { data: details, isLoading, error } = useMovieDetails(movieId, { enabled: !!movieId });

  // Load initial data based on type
  useEffect(() => {
    if (type === 'favorites') {
      const savedFavorites = localStorage.getItem("favoritesMovies");
      if (savedFavorites) {
        try {
          setMovies(JSON.parse(savedFavorites));
        } catch (error) {
          console.error("Error parsing favorites:", error);
          localStorage.removeItem("favoritesMovies");
        }
      }
    } else if (type === 'dashboard') {
      const savedQueue = localStorage.getItem("dashboardMovieQueue");
      if (savedQueue) {
        try {
          setMovies(JSON.parse(savedQueue));
        } catch (error) {
          console.error("Error parsing dashboard queue:", error);
          localStorage.removeItem("dashboardMovieQueue");
        }
      }

      // Check if there's a movie to add from localStorage
      const movieToAdd = localStorage.getItem("dashboardMovieToAdd");
      if (movieToAdd) {
        // Remove it from localStorage immediately
        localStorage.removeItem("dashboardMovieToAdd");

        // Create a temporary movie object to trigger the addition logic
        // We'll need to fetch the movie details, but for now we'll use a placeholder
        // The actual addition will happen in the useEffect below when details are available
        console.log("Detected movie to add to dashboard:", movieToAdd);
      }
    }
  }, [type]);

  // Handle new movie addition
  useEffect(() => {
    if (!movieId || !details || !genresData) return;

    const category =
      details.genres
        ?.map(
          (genre) => genresData.genres?.find((g) => g.id === genre.id)?.name
        )
        ?.filter(Boolean)
        ?.join(", ") || "N/A";

    const newMovie = {
      id: details.id,
      name: details.title,
      category,
      language: details.original_language?.toUpperCase() || "EN",
      year: details.release_date ? details.release_date.split("-")[0] : "N/A",
      time: details.runtime ? `${details.runtime} min` : "N/A",
      image: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : null,
    };

    setMovies((prev) => {
      // Skip if already exists
      if (prev.some((movie) => movie.id === details.id)) return prev;

      let updated;

      if (type === 'favorites') {
        // For favorites: just add to the end
        updated = [...prev, newMovie];
        localStorage.setItem("favoritesMovies", JSON.stringify(updated));
      } else if (type === 'dashboard') {
        // For dashboard: use queue technique (max 10, remove oldest, add new at top)
        updated = [newMovie, ...prev];
        if (updated.length > 10) {
          updated = updated.slice(0, 10);
        }
        localStorage.setItem("dashboardMovieQueue", JSON.stringify(updated));
      }

      // Call the callback if provided
      if (onMoviesUpdate) {
        onMoviesUpdate(updated);
      }

      return updated;
    });
  }, [movieId, details, genresData, type, onMoviesUpdate]);

  return { movies, isLoading, error };
};
