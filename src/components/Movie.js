import { useNavigate } from "react-router-dom";

function Movie({ movie }) {
   const navigate = useNavigate();

  const handleAddToDashboard = (movieId) => {
    // Add movie to dashboard queue by setting it in localStorage
    // The Dashboard component will detect this and add it to the queue
    localStorage.setItem("dashboardMovieToAdd", movieId.toString());

    // Navigate to the movie page
    navigate(`/movie/${movieId}`);
  };
  return (
    <div className="overflow-hidden relative p-1 rounded border transition-all duration-300 border-border hover:scale-95">
      <button onClick={() => handleAddToDashboard(movie.id)} className="block w-full">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
          alt={movie.title}
          className="object-contain w-full h-72"
        />
      </button>
      <div className="absolute right-0 bottom-0 left-0 p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="font-semibold text-white truncate">{movie.title}</h3>
      </div>
    </div>
  );
}

export default Movie;
