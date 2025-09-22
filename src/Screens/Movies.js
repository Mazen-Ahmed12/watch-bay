import { useState, useEffect } from "react";
import { CgSpinner } from "react-icons/cg";
import { useDiscoverMovies, useGenres } from "../api/queries";
import Filters from "../components/Filters";
import Movie from "../components/Movie";
import Layout from "../Layout/Layout";

function MoviesPage() {
  const [filters, setFilters] = useState({
    category: null,
    year: null,
    rating: null,
    runtime: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);

  const { data: pageData, isLoading, isError, isFetching, error } =
    useDiscoverMovies(filters, currentPage);
  const { data: genresData } = useGenres();

  const isLoadingMore = isFetching && currentPage > 1;

  useEffect(() => {
    if (pageData?.results) {
      setAllMovies(prev => {
        if (currentPage === 1) return pageData.results;

        const moviesMap = new Map(prev.map(movie => [movie.id, movie]));
        pageData.results.forEach(movie => {
          if (!moviesMap.has(movie.id)) moviesMap.set(movie.id, movie);
        });
        return Array.from(moviesMap.values());
      });
    }
  }, [pageData, currentPage]);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const loadMoreMovies = () => {
    if (pageData?.total_pages && currentPage < pageData.total_pages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters
          onFilterChange={handleFilterChange}
          genres={genresData?.genres || []}
        />
        <p className="text-lg font-medium my-6">
          Showing{" "}
          <span className="font-bold text-subMain">{allMovies.length}</span> of{" "}
          <span className="font-bold">{pageData?.total_results || 0}</span>{" "}
          movies
        </p>

        {isLoading && currentPage === 1 ? (
          <div className="w-full flex-colo min-h-[60vh] bg-dry rounded-lg">
            <CgSpinner className="animate-spin text-subMain text-4xl" />
            <p className="mt-4 text-lg">Loading movies...</p>
          </div>
        ) : isError ? (
          <div className="w-full flex-colo min-h-[60vh] bg-dry rounded-lg p-4">
            <p className="text-red-500 text-lg mb-4">
              {error?.message || "Error loading movies. Please try again."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-subMain text-white rounded hover:bg-opacity-90"
            >
              Retry
            </button>
          </div>
        ) : allMovies.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {allMovies.map(movie => (
                <Movie
                  key={movie.id}
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
            {pageData?.total_pages && currentPage < pageData.total_pages && (
              <div className="w-full flex-colo my-10">
                <button
                  onClick={loadMoreMovies}
                  disabled={isLoadingMore}
                  className={`flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain hover:bg-subMain hover:text-white transition-colors duration-300 ${
                    isLoadingMore ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoadingMore ? (
                    <>
                      <CgSpinner className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Movies"
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex-colo my-20 text-lg text-dryGray">
            No movies found matching your filters
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
