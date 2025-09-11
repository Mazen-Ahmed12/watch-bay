import { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { tmdbAPI } from '../api/tmdb';
import Movie from '../components/Movie';
import Loader from '../components/Loader';
import Titles from '../components/Titles';
import Layout from '../Layout/Layout';

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNum) => {
    try {
      setLoading(true);
      const response = await tmdbAPI.getPopularMovies(pageNum);
      
      if (response?.results) {
        setMovies(prev => 
          pageNum === 1 
            ? response.results 
            : [...prev, ...response.results]
        );
        setTotalPages(response.total_pages || 1);
      }
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  return (
    <Layout>
      <div className="min-h-screen p-2 lg:px-4">
        <div className="container mx-auto">
          <Titles title="Popular Movies" Icon={MdFavorite} />
          {loading && movies.length === 0 ? (
          <div className="w-full flex-colo min-h-[60vh] bg-dry rounded-lg">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
              {movies.map((movie) => (
                <Movie 
                  key={`${movie.id}-${movie.title}`}
                  movie={{
                    ...movie,
                    image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
                    name: movie.title ,
                  }}
                />
              ))}
            </div>
            {page < totalPages && (
              <div className="w-full flex-colo mt-10">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-subMain hover:bg-transparent border-2 border-subMain transitions text-white py-3 px-8 rounded-full font-semibold flex-rows gap-3"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
          )}
        </div>
      </div>
    </Layout>
  );
}
