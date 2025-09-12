import { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { tmdbAPI } from '../../api/tmdb';


function Banner() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        const data = await tmdbAPI.getTrending('day');
        setTrendingMovies(data.results.slice(0, 8));
      } catch (err) {
        console.error('Error fetching trending movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center">
      <Swiper
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        speed={2000}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full xl:h-128 lg:h-112 h-98"
      >
        {trendingMovies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="relative overflow-hidden"
          >
            <div className="relative w-full h-full">
              <img
                src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ''}
                alt={movie.title || 'Movie'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-main to-transparent"></div>
              <div className="container mx-auto px-4 absolute bottom-0 left-0 right-0 z-10">
                <div className="flex flex-col items-start gap-4 pb-12">
                  <h1 className="text-4xl font-bold text-white">
                    {movie.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <span className="text-white">{movie.release_date?.substring(0, 4)}</span>
                    <span className="text-white">⭐ {movie.vote_average?.toFixed(1)}/10</span>
                    <span className="text-white">{movie.adult ? '18+' : 'All'}</span>
                  </div>
                  <p className="text-white max-w-2xl line-clamp-3">
                    {movie.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="bg-main text-white px-6 py-2 rounded-md hover:bg-transparent hover:border hover:border-main transition-all duration-300"
                    >
                      Watch Now
                    </Link>
                    <Link to={`/favorites`} className="bg-transparent border border-main text-white px-6 py-2 rounded-md hover:bg-main transition-all duration-300">
                      <MdFavorite className="inline-block mr-2" />
                      Add to Favorites
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Banner