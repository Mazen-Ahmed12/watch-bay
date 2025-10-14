import { useGenres, useMovieDetails, useMovieImages } from "api/queries";
import { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

function FavoritesMovies() {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const movieId = location.state?.movieId;
  const processedMovies = useRef(new Set()); // Track processed movie IDs
  const isProcessing = useRef(false); // Prevent concurrent processing

  // Fetch genres once for mapping
  const { data: genresData } = useGenres();
  // Fetch details and images
  const { data: details } = useMovieDetails(movieId, { enabled: !!movieId });
  const { data: images } = useMovieImages(movieId, { enabled: !!movieId });
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoritesMovies");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]);
        localStorage.removeItem("favoritesMovies");
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes (with deduplication)
  useEffect(() => {
    if (favorites.length > 0) {
      // Ensure no duplicates before saving
      const uniqueFavorites = favorites.filter((movie, index, self) =>
        index === self.findIndex(m => m.id === movie.id)
      );
      localStorage.setItem("favoritesMovies", JSON.stringify(uniqueFavorites));

      // Update state if duplicates were removed
      if (uniqueFavorites.length !== favorites.length) {
        setFavorites(uniqueFavorites);
      }
    } else {
      localStorage.removeItem("favoritesMovies");
    }
  }, [favorites]);

  // Effect to add new movie when movieId prop changes
  useEffect(() => {
    if (!movieId || !details || !images || !genresData) {
      return; // Skip if no ID or missing data
    }

    // Prevent concurrent processing and duplicate processing
    if (isProcessing.current || processedMovies.current.has(movieId)) {
      return; // Already processing or already processed
    }

    // Check if already in favorites (most reliable check)
    if (favorites.some((fav) => fav.id === movieId)) {
      processedMovies.current.add(movieId); // Mark as processed
      return; // Skip if already exists
    }

    // Set processing flag to prevent concurrent additions
    isProcessing.current = true;

    // Small delay to ensure state consistency
    setTimeout(() => {
      // Double-check after delay
      setFavorites(currentFavorites => {
        const movieExists = currentFavorites.some((fav) => fav.id === movieId);
        if (movieExists) {
          processedMovies.current.add(movieId);
          isProcessing.current = false;
          return currentFavorites; // Don't add duplicate
        }

        // Map genres to category string
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

        processedMovies.current.add(movieId); // Mark as processed
        isProcessing.current = false; // Clear processing flag

        return [...currentFavorites, newMovie];
      });
    }, 100); // Small delay to ensure state consistency

  }, [movieId, details, images, genresData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteAll = () => {
    setFavorites([]);
    processedMovies.current.clear(); // Clear processed movies when deleting all
    isProcessing.current = false; // Reset processing flag
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="gap-2 flex-btn">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          <button
            onClick={handleDeleteAll}
            className="px-6 py-3 font-medium text-white rounded border bg-main transitions hover:bg-subMain border-subMain"
          >
            Delete All
          </button>
        </div>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <Table data={favorites} admin={false} />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
