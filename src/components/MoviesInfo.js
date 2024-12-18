import React from "react";
import { MdStarRate, MdPreview } from "react-icons/md";

function MoviesInfo(movie) {
  <>
    <div className="flex items-center gap-1">
      <span className="text-ms">{movie.year}</span>
    </div>
    <div className="flex items-center gap-1">
      <span>{movie.time}</span>
    </div>
    <div className="flex items-center gap-1">
      <MdStarRate />
      <span>{movie.reating}</span>
    </div>
    <div className="flex items-center gap-1">
      <MdPreview />
      <span>{movie.reviews}</span>
    </div>
  </>;
}

export default MoviesInfo;
