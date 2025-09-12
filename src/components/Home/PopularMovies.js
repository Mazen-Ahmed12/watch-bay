import { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { tmdbAPI } from '../../api/tmdb';
import Loader from '../Loader';
import Movie from '../Movie';
import Titles from '../Titles';

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await tmdbAPI.getPopularMovies(1);
        if (response?.results) {
          setMovies(response.results.slice(0, 8));
        }
      } catch (err) {
        console.error('Error fetching popular movies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <div className='my-16'>
      <div className='flex justify-between items-center mb-6'>
        <Titles title="Popular Movies" Icon={MdFavorite} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
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
      )}
      
          <Link 
            to="/popular-movies"
            className='w-32 h-14 flex items-center justify-center justify-self-center text-white bg-subMain text-xl rounded-full font-bold hover:text-main transitions mt-8'
          >
            View All
          </Link>
    </div>
  )
}

export default PopularMovies