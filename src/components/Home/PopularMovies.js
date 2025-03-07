import React from 'react'
import { MdFavorite  } from 'react-icons/md';
import Titles from '../../components/Titles';
import { Movies } from '../../Data/MovieData';
import Movie from '../../components/Movie';



function PopularMovies() {
  return (
    <div className='my-16'>
      <Titles title="Popular Movies" Icon={MdFavorite }/>
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {Movies.slice(0, 8).map((movie, index) => (
            <Movie key={index} movie={movie}/>
        ))}
      </div>
    </div>
  )
}

export default PopularMovies