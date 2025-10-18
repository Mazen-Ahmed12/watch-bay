import { useMovieHandler } from "../../utils/MovieHandler";
import Table from "../../components/Table";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";

function FavoritesMovies() {
  const location = useLocation();
  const movieId = location.state?.movieId;

  const { movies: favorites } = useMovieHandler({
    type: 'favorites',
    movieId,
  });

  const handleDeleteAll = () => {
    localStorage.removeItem("favoritesMovies");
    // The useMovieHandler hook will automatically reload from localStorage
    window.location.reload();
  };

  return (
    <SideBar>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 justify-between items-center p-3">
          <h2 className="text-xl font-bold">Favorites Movies</h2>
          <button
            onClick={handleDeleteAll}
            className="px-6 py-3 font-medium text-white rounded border bg-main transitions hover:bg-subMain border-subMain"
          >
            Delete All
          </button>
        </div>
        {favorites.length === 0 ? (
          <p className="pb-5 text-lg font-bold text-center">No favorites yet.</p>
        ) : (
          <Table data={favorites} admin={false} />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovies;
