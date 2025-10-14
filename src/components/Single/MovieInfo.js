import {
  FaCalendarAlt,
  FaClock,
  FaPlay,
  FaShareAlt,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function MovieInfo({ movie, setModalOpen }) {
  if (!movie) return null;

  return (
    <div className="relative w-full text-white xl:h-screen">
      {movie?.backdrop && (
        <img
          src={movie.backdrop}
          alt={movie.title || "Movie Backdrop"}
          className="hidden object-cover w-full h-full xl:inline-block"
        />
      )}
      <div className="top-0 right-0 bottom-0 left-0 xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute">
        <div className="container grid-cols-3 gap-8 px-3 py-10 mx-auto 2xl:px-32 xl:grid flex-colo lg:py-20">
          {/* Movie Poster */}
          <div className="overflow-hidden order-last w-full rounded-lg border border-gray-800 xl:col-span-1 xl:order-none h-header bg-dry">
            <img
              src={movie?.image || "/images/placeholder-poster.png"}
              alt={movie?.title || "Movie Poster"}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/placeholder-poster.png";
              }}
            />
          </div>

          {/* Movie Details */}
          <div className="col-span-2">
            <div className="flex flex-col gap-6">
              {/* Title and Rating */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-4 items-center">
                  <h1 className="font-sans text-2xl font-bold capitalize xl:text-4xl">
                    {movie.title}
                  </h1>
                  <div className="flex gap-2 items-center text-yellow-500">
                    <FaStar className="text-lg" />
                    <span className="text-white">
                      {movie.vote_average?.toFixed(1)}/10
                    </span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 items-center text-sm text-dryGray">
                  <span className="flex gap-1 items-center">
                    <FaCalendarAlt /> {movie.release_date || "N/A"}
                  </span>
                  <span className="flex gap-1 items-center">
                    <FaClock /> {movie.runtime ? `${movie.runtime} min` : "N/A"}
                  </span>
                  {movie.genres && (
                    <span>
                      {typeof movie.genres === "string"
                        ? movie.genres
                        : movie.genres.join(", ")}
                    </span>
                  )}
                </div>
              </div>

              {/* Overview */}
              <div className="text-sm">
                <p className="mb-2 font-medium text-white">Overview</p>
                <p className="leading-relaxed text-gray-400">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid gap-4 py-2 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  {movie.status && (
                    <div className="flex gap-2 items-center">
                      <span className="font-medium text-dryGray">Status:</span>
                      <span className="text-white">{movie.status}</span>
                    </div>
                  )}
                  {movie.original_language && (
                    <div className="flex gap-2 items-center">
                      <span className="font-medium text-dryGray">
                        Language:
                      </span>
                      <span className="text-white">
                        {movie.original_language.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {movie.budget > 0 && (
                    <div className="flex gap-2 items-center">
                      <span className="font-medium text-dryGray">Budget:</span>
                      <span className="text-white">
                        ${movie.budget.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                {movie.tagline && (
                  <div className="self-center text-sm italic text-gray-400">
                    "{movie.tagline}"
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Link
                  to={`/watch/${movie.id}`}
                  className="flex gap-2 justify-center items-center px-8 py-3 text-sm font-medium text-white rounded transition-all bg-subMain hover:bg-opacity-90"
                >
                  <FaPlay /> Watch Now
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex gap-2 justify-center items-center px-8 py-3 text-sm font-medium text-black bg-white rounded transition-all hover:bg-subMain hover:text-white"
                >
                  <FaShareAlt /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
