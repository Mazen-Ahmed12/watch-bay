import React, { useRef, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Titles from "../Titles";

// Simple image component with skeleton loading
const CastImage = React.memo(({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();
  
  // Use lower quality image for faster loading
  const imageUrl = src || '';

  return (
    <div className="relative w-full h-64 overflow-hidden rounded">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      {!imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
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
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={visibleCasts.length > 4}
          speed={400}
          modules={[Autoplay]}
          spaceBetween={15}
          preloadImages={false}
          updateOnImagesReady={false}
          watchSlidesProgress={true}
          watchSlidesVisibility={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {visibleCasts.length > 0 ? (
            visibleCasts.map((cast) => (
              <SwiperSlide key={cast.id} className="h-auto">
                <Link to={`/person/${cast.id}`} className="w-full h-full block">
                  <div className="w-full h-full p-3 italic text-xs text-text rounded flex flex-col bg-dry border border-gray-800 hover:bg-greyed transition-colors">
                    <CastImage 
                      src={cast.profile_path 
                        ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                        : ''
                      }
                      alt={cast.name}
                    />
                    <p className="font-bold text-base mt-2">{cast.name}</p>
                    <p className="text-subMain text-sm mt-1">{cast.character}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <div className="col-span-4 text-center py-10">
              <p className="text-subMain">No cast information available</p>
            </div>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieCasts;
