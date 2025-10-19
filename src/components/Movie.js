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
    <div className="overflow-hidden relative gap-20 w-full rounded border transition-all duration-300 sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 border-border hover:scale-95">
      <button onClick={() => handleAddToDashboard(movie.id)} className="block w-full">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
          alt={movie.title}
          className="object-fill w-full h-72"
        />
      </button>
      <div className="absolute right-0 bottom-0 left-0 p-3 bg-gradient-to-t from-black to-transparent">
        <h3 className="font-semibold text-center text-white truncate">{movie.title}</h3>
      </div>
    </div>
  );
}

export default Movie;
