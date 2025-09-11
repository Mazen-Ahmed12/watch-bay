import React from "react";
import {
  FaPlay,
  FaShareAlt,
  FaStar,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

function MovieInfo({ movie, setModalOpen }) {
  if (!movie) return null;

  return (
    <div className="w-full xl:h-screen relative text-white">
      {movie?.backdrop && (
        <img
          src={movie.backdrop}
          alt={movie.title || "Movie Backdrop"}
          className="w-full hidden xl:inline-block h-full object-cover"
        />
      )}
      <div className="xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          {/* Movie Poster */}
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={movie?.image || "/images/placeholder-poster.png"}
              alt={movie?.title || "Movie Poster"}
              className="w-full h-full object-cover"
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
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                    {movie.title}
                  </h1>
                  <div className="flex items-center gap-2 text-yellow-500">
                    <FaStar className="text-lg" />
                    <span className="text-white">
                      {movie.vote_average?.toFixed(1)}/10
                    </span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-dryGray text-sm flex-wrap">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {movie.release_date || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
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
                <p className="text-white font-medium mb-2">Overview</p>
                <p className="text-gray-400 leading-relaxed">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Additional Info */}
              <div className="grid sm:grid-cols-2 gap-4 py-2">
                <div className="flex flex-col gap-2">
                  {movie.status && (
                    <div className="flex items-center gap-2">
                      <span className="text-dryGray font-medium">Status:</span>
                      <span className="text-white">{movie.status}</span>
                    </div>
                  )}
                  {movie.original_language && (
                    <div className="flex items-center gap-2">
                      <span className="text-dryGray font-medium">
                        Language:
                      </span>
                      <span className="text-white">
                        {movie.original_language.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {movie.budget > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-dryGray font-medium">Budget:</span>
                      <span className="text-white">
                        ${movie.budget.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                {movie.tagline && (
                  <div className="italic text-gray-400 text-sm self-center">
                    "{movie.tagline}"
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to={`/watch/${movie.id}`}
                  className="bg-subMain hover:bg-opacity-90 text-white px-8 py-3 rounded font-medium text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <FaPlay /> Watch Now
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-white hover:bg-subMain hover:text-white text-black px-8 py-3 rounded font-medium text-sm flex items-center justify-center gap-2 transition-all"
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
