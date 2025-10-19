import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { usePopularMovies } from "../../api/queries";
import Loader from "../Loader";
import Movie from "../Movie";
import Titles from "../Titles";

function PopularMovies() {
  const { data, isLoading, isError } = usePopularMovies();
  const movies = data?.results?.slice(0, 8) || [];
  
  if (isLoading) {
    return (
      <div className="container px-2 mx-auto my-6">
        <Titles title="Popular Movies" Icon={MdFavorite} />
        <div className="w-full flex-colo">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError || !data?.results) {
    return (
      <div className="container px-2 mx-auto my-6">
        <Titles title="Error Loading Movies" Icon={MdFavorite} />
        <div className="w-full flex-colo">
          <p className="text-red-500">Failed to load movies. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-16">
      <div className="flex justify-between items-center mb-6">
        <Titles title="Popular Movies" Icon={MdFavorite} />
      </div>

      <div className="flex flex-col gap-8 justify-center mt-6 sm:mt-10 sm:flex-row sm:flex-wrap">
        {movies.map((movie) => (
          <Movie
            key={`${movie.id}-${movie.title}`}
            movie={{
              ...movie,
              image: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "",
              name: movie.title,
            }}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/popular-movies"
          className="flex justify-center items-center w-32 h-14 text-xl font-bold text-white rounded-full transition-colors duration-300 bg-subMain hover:bg-main hover:text-white"
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export default PopularMovies;
