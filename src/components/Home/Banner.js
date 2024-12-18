import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Movies } from "../../Data/MovieData";
import MoviesInfo from "../MoviesInfo";
import { Link } from 'react-router-dom';
import { MdFavorite } from 'react-icons/md';

function Banner() {
  return (
    <div className="relative flex justify-center items-center">
        <Swiper
          loop={true}
          slidesPerView={1}
          centeredSlides={true}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full xl:h-128 lg:h-112 h-96  "
        >
          {Movies.slice(0, 8).map((movie, index) => (
            <SwiperSlide
              key={index}
              className="relative rounded overflow-hidden flex "
            >
              <img
                srcSet={`/movies/${movie.image}`}
                alt={movie.name}
                className="w-3/5 h-full object-fit mx-auto  "
              />
              <div className="w-3/5 absolute sl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4 ">
                <h1 className="xl:text-2xl sm:text-xl text-xl font-bold text-text">
                  {movie.name}
                </h1>
                <div className="flex gap-5 items-center text-text">
                  <MoviesInfo movie={movie} />
                </div>
                <div className='flex gap-5 item-center'>
                  <Link
                  to={`/movie/${movie.name}`}
                  className='bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs'
                  >
                    watch
                  </Link>
                <button className='bg-white hover:text-subMain  transitions text-white px-4 py-3 rounded text-sm bg-opacity-30'>
                <MdFavorite />
                </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
  )
}

export default Banner