import { useGenres, useMovieDetails, useMovieImages } from "api/queries";
import { useEffect, useRef, useState } from "react";
import Table from "../../components/Table";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

function FavoritesMovies() {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const movieId = location.state?.movieId;
  const hasAddedRef = useRef(false);

  // Fetch genres once for mapping
  const { data: genresData } = useGenres();
  // Fetch details and images
  const { data: details } = useMovieDetails(movieId, { enabled: !!movieId });
  const { data: images } = useMovieImages(movieId, { enabled: !!movieId });
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoritesMovies");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favoritesMovies", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favoritesMovies");
    }
  }, [favorites]);

  // Effect to add new movie when movieId prop changes
  useEffect(() => {
    if (!movieId || !details || !images || !genresData || hasAddedRef.current) {
      return; // Skip if no ID, no data, or already added
    }

    // Check if already in favorites
    if (favorites.some((fav) => fav.id === movieId)) {
      hasAddedRef.current = true;
      return;
    }
    // Map genres to category string
    const category =
      details.genres
        ?.map(
          (genre) => genresData.genres?.find((g) => g.id === genre.id)?.name
        )
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

    setFavorites((prev) => [...prev, newMovie]);
    hasAddedRef.current = true; // Mark as added
  }, [movieId, details, images, genresData, favorites]);

  const handleDeleteAll = () => {
    setFavorites([]);
    hasAddedRef.current = false;
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
