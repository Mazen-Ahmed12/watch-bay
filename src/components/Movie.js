import { Link } from "react-router-dom";

function Movie({ movie }) {
  return (
    <div className="border border-border p-1 hover:scale-95 transition-all duration-300 relative rounded overflow-hidden">
      <Link to={`/movie/${movie.id}`} className="w-full block">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
          alt={movie.title}
          className="w-full h-72 object-cover"
        />
      </Link>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
        <h3 className="font-semibold text-white truncate">{movie.title}</h3>
      </div>
    </div>
  );
}

export default Movie;
