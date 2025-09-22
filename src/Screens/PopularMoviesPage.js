import { useEffect, useRef, useCallback } from 'react';
import { MdFavorite } from 'react-icons/md';
import { useInfinitePopularMovies } from '../api/queries';
import Loader from '../components/Loader';
import Movie from '../components/Movie';
import Titles from '../components/Titles';
import Layout from '../Layout/Layout';

export default function PopularMoviesPage() {
  const loaderRef = useRef(null);
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfinitePopularMovies();

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

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [handleObserver]);

  const movies = data?.pages.flatMap(page => page?.results || []) || [];
  const isLoading = status === 'loading';

  if (isLoading && movies.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-2 my-6">
          <Titles title="Popular Movies" Icon={MdFavorite} />
          <div className="w-full flex-colo min-h-[60vh] bg-dry rounded-lg">
            <Loader />
          </div>
        </div>
      </Layout>
    );
  }

  if (status === 'error') {
    return (
      <Layout>
        <div className="container mx-auto px-2 my-6">
          <Titles title="Popular Movies" Icon={MdFavorite} />
          <div className="w-full flex-colo min-h-[60vh] bg-dry rounded-lg p-4">
            <p className="text-red-500 text-lg mb-4">
              {error?.message || 'Error loading movies. Please try again.'}
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
      <div className="min-h-screen p-2 lg:px-4">
        <div className="container mx-auto">
          <Titles title="Popular Movies" Icon={MdFavorite} />
          <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {movies.map((movie) => (
              <Movie 
                key={`${movie.id}-${movie.title}`}
                movie={{
                  ...movie,
                  image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
                  name: movie.title,
                }}
              />
            ))}
          </div>
          
          <div ref={loaderRef} className="w-full flex-colo my-10">
            {isFetchingNextPage ? (
              <div className="flex items-center justify-center gap-2">
                <MdFavorite className="animate-spin text-subMain" />
                <span>Loading more movies...</span>
              </div>
            ) : hasNextPage ? (
              <button
                onClick={() => fetchNextPage()}
                className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain hover:bg-subMain hover:text-white transition-colors duration-300"
              >
                Load More Movies
              </button>
            ) : (
              <p className="text-textGray">No more movies to load</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
