import { useGenres, useMovieDetails } from "api/queries";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

function FavoritesMovies() {
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const movieId = location.state?.movieId;

  const { data: genresData } = useGenres();
  const { data: details } = useMovieDetails(movieId, { enabled: !!movieId });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoritesMovies");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error parsing favorites:", error);
        localStorage.removeItem("favoritesMovies");
      }
    }
  }, []);

  // Add new movie when details are available
  useEffect(() => {
    if (!movieId || !details || !genresData) return;

    setFavorites((prev) => {
      // Skip if already in favorites
      if (prev.some((fav) => fav.id === details.id)) return prev;

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

      const updated = [...prev, newMovie];
      localStorage.setItem("favoritesMovies", JSON.stringify(updated));
      return updated;
    });
  }, [movieId, details, genresData]);

  const handleDeleteAll = () => {
    setFavorites([]);
    localStorage.removeItem("favoritesMovies");
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
