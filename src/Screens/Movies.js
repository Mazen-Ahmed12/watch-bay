import { useState, useEffect, useRef, useCallback } from "react";
import { CgSpinner } from "react-icons/cg";
import { useInfiniteDiscoverMovies, useGenres } from "../api/queries";
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
  const loaderRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteDiscoverMovies(filters);

  const { data: genresData } = useGenres();

  // Handle infinite scroll
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleObserver]);

  const movies = data?.pages.flatMap(page => page?.results || []) || [];
  const isLoading = status === 'loading';

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  if (isLoading && movies.length === 0) {
    return (
      <Layout>
        <div className="min-height-screen container mx-auto px-2 my-6">
          <Filters
            onFilterChange={handleFilterChange}
            genres={genresData?.genres || []}
          />
          <div className="w-full flex-colo min-h-[60vh] bg-dry rounded-lg">
            <CgSpinner className="animate-spin text-subMain text-4xl" />
            <p className="mt-4 text-lg">Loading movies...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (status === 'error') {
    return (
      <Layout>
        <div className="min-height-screen container mx-auto px-2 my-6">
          <Filters
            onFilterChange={handleFilterChange}
            genres={genresData?.genres || []}
          />
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters
          onFilterChange={handleFilterChange}
          genres={genresData?.genres || []}
        />
        <p className="text-lg font-medium my-6">
          Showing{" "}
          <span className="font-bold text-subMain">{movies.length}</span> of{" "}
          <span className="font-bold">
            {data?.pages[0]?.total_results || 0}
          </span>{" "}
          movies
        </p>

        {movies.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies.map(movie => (
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
            <div ref={loaderRef} className="my-10 w-full flex-colo">
              {isFetchingNextPage ? (
                <div className="flex gap-2 justify-center items-center">
                  <CgSpinner className="animate-spin text-subMain" />
                  <span>Loading more movies...</span>
                </div>
              ) : hasNextPage ? (
                <button
                  onClick={() => fetchNextPage()}
                  className="gap-3 px-8 py-3 font-semibold text-white rounded border-2 transition-colors duration-300 flex-rows border-subMain hover:bg-subMain hover:text-white"
                >
                  Load More Movies
                </button>
              ) : (
                <p className="text-textGray">No more movies to load</p>
              )}
            </div>
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
