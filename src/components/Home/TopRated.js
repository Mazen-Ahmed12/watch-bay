import Rating from "@mui/material/Rating";
import { useState } from "react";
import {
  BsBookmarkStarFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Autoplay, Navigation, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTopRatedMovies } from "../../api/queries";
import Titles from "../Titles";

function TopRated() {
  const { data, isLoading, isError } = useTopRatedMovies(1);
  const topRatedMovies = data?.results || [];
  const error = isError ? "Failed to load top rated movies." : null;
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const navigate = useNavigate();

  const handleAddToDashboard = (movieId) => {
    // Add movie to dashboard queue by setting it in localStorage
    // The Dashboard component will detect this and add it to the queue
    localStorage.setItem("dashboardMovieToAdd", movieId.toString());

    // Navigate to the movie page
    navigate(`/movie/${movieId}`);
  };
  const className =
    "w-8 h-8 text-sm text-white hover:bg-dry transitions rouned flex-colo bg-subMain";

  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        <Swiper
          navigation={{ nextEl, prevEl }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          loop={true}
          mousewheel={{
            forceToAxis: true, // vertical wheel scrolls horizontally
            releaseOnEdges: false, // keeps looping instead of stopping
            sensitivity: 1, // adjust scroll sensitivity
          }}
          modules={[Navigation, Autoplay, Mousewheel]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {isLoading ? (
            <div className="flex col-span-4 justify-center items-center">
              <p>Loading top rated movies...</p>
            </div>
          ) : error ? (
            <div className="col-span-4 text-center text-subMain">
              <p>{error}</p>
            </div>
          ) : (
            topRatedMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="overflow-hidden rounded-lg border h-rate hovered border-border bg-dry flex-colo">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : ""
                    }
                    alt={movie.title}
                    className="object-contain w-full h-full rounded-lg"
                  />
                  <div className="flex absolute top-0 right-0 bottom-0 left-0 flex-col gap-6 justify-center items-center px-4 text-center bg-black bg-opacity-70 hoveres">
                    <button
                      onClick={() =>
                        navigate("/favorites", { state: { movieId: movie.id } })
                      }
                      className="w-12 h-12 text-white bg-white bg-opacity-30 rounded-full flex-colo transitions hover:bg-subMain"
                    >
                      <FaHeart />
                    </button>
                    <button
                      className="text-xl font-semibold text-white trancuted line-clamp-2"
                      onClick={() => handleAddToDashboard(movie.id)}
                    >
                      {movie.title}
                    </button>
                    <div className="flex gap-2">
                      <Rating
                        name="read-only"
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <span className="text-white">
                        ({movie.vote_average.toFixed(1)})
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div className="gap-6 px-1 pt-12 w-full flex-rows">
          <button className={className} ref={(node) => setPrevEl(node)}>
            <BsChevronLeft />
          </button>
          <button className={className} ref={(node) => setNextEl(node)}>
            <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
