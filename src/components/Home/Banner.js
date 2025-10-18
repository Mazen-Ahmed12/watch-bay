import { MdFavorite } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTrendingMovies } from "../../api/queries";

function Banner() {
  const { data, isLoading, isError } = useTrendingMovies("day");
  const trendingMovies = data?.results?.slice(0, 8) || [];
  const error = isError
    ? "Failed to load movies. Please try again later."
    : null;
  const navigate = useNavigate();

  const handleAddToDashboard = (movieId) => {
    // Add movie to dashboard queue by setting it in localStorage
    // The Dashboard component will detect this and add it to the queue
    localStorage.setItem("dashboardMovieToAdd", movieId.toString());

    // Navigate to the movie page
    navigate(`/movie/${movieId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-96">
        <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-96 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex relative justify-center items-center pt-4 md:pt-8">
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
        className="w-full h-80 xl:h-128 lg:h-112 sm:h-96"
      >
        {trendingMovies.map((movie) => (
          <SwiperSlide key={movie.id} className="overflow-hidden relative">
            <div className="block w-full h-full">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : ""
                }
                alt={movie.title || "Movie"}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t to-transparent via-black/20 from-black/80"></div>
              <div className="container absolute right-0 bottom-0 left-0 z-10 px-3 mx-auto sm:px-4">
                <div className="flex flex-col gap-2 items-start pb-6 sm:gap-4 sm:pb-8 md:pb-12">
                  <h1 className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                    {movie.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 items-center sm:gap-4">
                    <span className="px-2 py-1 text-sm text-white rounded sm:text-base bg-black/30">
                      {movie.release_date?.substring(0, 4)}
                    </span>
                    <span className="px-2 py-1 text-sm text-white rounded sm:text-base bg-black/30">
                      ⭐ {movie.vote_average?.toFixed(1)}/10
                    </span>
                    <span className="px-2 py-1 text-sm text-white rounded sm:text-base bg-black/30">
                      {movie.adult ? "18+" : "All"}
                    </span>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed sm:max-w-2xl sm:text-base text-white/90 line-clamp-2 sm:line-clamp-3">
                    {movie.overview}
                  </p>
                  <div className="flex flex-col gap-2 items-start sm:flex-row sm:gap-4 sm:items-center">
                    <button
                      onClick={() => handleAddToDashboard(movie.id)}
                      className="px-4 py-2 w-full text-sm text-white rounded-md transition-all duration-300 sm:px-6 sm:py-3 sm:text-base bg-main hover:bg-transparent hover:border hover:border-main sm:w-auto"
                    >
                      Watch Now
                    </button>
                    <Link
                      to={`/favorites`}
                      className="px-4 py-2 w-full text-sm text-white rounded-md transition-all duration-300 sm:px-6 sm:py-3 sm:text-base bg-main hover:bg-transparent hover:border hover:border-main sm:w-auto"
                    >
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
  );
}

export default Banner;
