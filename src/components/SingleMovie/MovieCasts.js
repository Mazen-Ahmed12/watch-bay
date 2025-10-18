import React, { useRef, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Titles from "../Titles";

// Simple image component with skeleton loading
const CastImage = React.memo(({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  // Use lower quality image for faster loading
  const imageUrl = src || null;

  return (
    <div className="overflow-hidden relative w-full h-64 rounded">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        className={`w-full h-full object-contain transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextElementSibling?.classList.remove("hidden");
        }}
      />
      {!imageUrl && (
        <div className="flex absolute inset-0 justify-center items-center bg-gray-800">
          <FaUserFriends className="text-4xl text-gray-600" />
        </div>
      )}
    </div>
  );
});

function MovieCasts({ casts }) {
  // Only load first 10 cast members
  const visibleCasts = casts.slice(0, 10);

  return (
    <div className="my-12">
      <Titles title="Casts" Icon={FaUserFriends} />
      <div className="mt-10">
        <Swiper
          loop={true} // infinite looping
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={600} // transition speed
          spaceBetween={15}
          mousewheel={{
            forceToAxis: true, // vertical wheel scrolls horizontally
            releaseOnEdges: false, // keeps looping instead of stopping
            sensitivity: 1, // adjust scroll sensitivity
          }}
          modules={[Autoplay, Mousewheel]}
          breakpoints={{
            0: { slidesPerView: 1 },
            400: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {visibleCasts.length > 0 ? (
            visibleCasts.map((cast) => (
              <SwiperSlide key={cast.id} className="h-auto">
                <div className="flex flex-col p-1 w-full h-full text-xs italic rounded border border-gray-800 transition-colors text-text bg-dry hover:bg-greyed">
                  <CastImage
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                        : ""
                    }
                    alt={cast.name}
                  />
                  <p className="mt-2 text-base font-bold text-center">{cast.name}</p>
                  <p className="mt-1 text-sm text-center text-subMain">{cast.character}</p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="col-span-4 py-10 text-center">
              <p className="text-subMain">No cast information available</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCasts;
