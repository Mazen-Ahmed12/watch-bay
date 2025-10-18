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
      <div className="container mx-auto px-2 my-6">
        <Titles title="Popular Movies" Icon={MdFavorite} />
        <div className="w-full flex-colo">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError || !data?.results) {
    return (
      <div className="container mx-auto px-2 my-6">
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

      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
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
          className="w-32 h-14 flex items-center justify-center text-white bg-subMain text-xl rounded-full font-bold hover:bg-main hover:text-white transition-colors duration-300"
        >
          View All
        </Link>
      </div>
    </div>
  );
}

export default PopularMovies;
