import React from "react";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";

function Movie({ movie }) {
  return (
    <>
      <div className="border border-borderp-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/movie/${movie.name}`} className="w-full">
          <img
            srcSet={`/movies/${movie.image}`}
            alt={movie.name}
            className="w-full h-64 object-fit"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button className="h-9 w-9 text-sm flex-colo transitions hover:bg-transparent border-subMain rounded-md bg-subMain text-white">
            <MdFavorite />
          </button>
        </div>
      </div>
    </>
  );
}

export default Movie;
