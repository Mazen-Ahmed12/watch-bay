import React from 'react';

function Head({ title }) {
  return (
    <div className="w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md">
      <img
        src="https://picsum.photos/id/237/800/600"
        alt="aboutus"
        className="w-full h-full object-fit"
      />
      <div className="absolute lg:top-24 top-16 w-full flex-colo">
        <h1 className="text-2xl lg:text-h1 text-white text-center font-bold">
          {title && title}
        </h1>
      </div>
    </div>
  );
}

export default Head;
