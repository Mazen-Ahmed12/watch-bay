import Rating from "@mui/material/Rating";
import { useState } from "react";
import { BsBookmarkStarFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTopRatedMovies } from "../../api/queries";
import Titles from "../Titles";

function TopRated() {
  const { data, isLoading, isError } = useTopRatedMovies(1);
  const topRatedMovies = data?.results || [];
  const error = isError ? "Failed to load top rated movies." : null;
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);

  const className = "hover:bg-dry transitions text-sm rouned w-8 h-8 flex-colo bg-subMain text-white";

  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        <Swiper
          navigation={{ nextEl, prevEl }}
          autoplay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
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
            <div className="col-span-4 flex items-center justify-center">
              <p>Loading top rated movies...</p>
            </div>
          ) : error ? (
            <div className="col-span-4 text-center text-subMain">
              <p>{error}</p>
            </div>
          ) : (
            topRatedMovies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden flex-colo">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                    <button className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                      <FaHeart />
                    </button>
                    <Link
                      className="font-semibold text-xl trancuted line-clamp-2 text-white"
                      to={`/movie/${movie.id}`}
                    >
                      {movie.title}
                    </Link>
                    <div className="flex gap-2">
                      <Rating
                        name="read-only"
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <span className="text-white">({movie.vote_average.toFixed(1)})</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <div className="w-full px-1 flex-rows gap-6 pt-12">
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
