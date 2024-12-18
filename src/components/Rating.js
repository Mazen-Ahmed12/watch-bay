import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";


function Rating({value}) {
  return (
    <>
      <span>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 6 ? (
          <FaStar />
        ) : value >= 5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 8 ? (
          <FaStar />
        ) : value >= 7 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 10 ? (
          <FaStar />
        ) : value >= 9 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
    </>
  );
}

export default Rating;
