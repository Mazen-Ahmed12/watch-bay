import React from 'react';

function Head({ title }) {
  return (
    <div className="overflow-hidden relative w-full rounded-md h-50 bg-deepGray lg:h-80">
      <img
        src="https://picsum.photos/id/242/1440/800"
        alt="aboutus"
        className="object-fill w-full h-full"
      />
      <div className="absolute top-20 w-full lg:top-28 flex-colo">
        <h1 className="text-2xl font-bold text-center text-white lg:text-h1">
          {title && title}
        </h1>
      </div>
    </div>
  );
}

export default Head;
