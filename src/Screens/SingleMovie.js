import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MovieCasts from "../components/Single/MovieCasts";
import MovieInfo from "../components/Single/MovieInfo";
import MovieRates from "../components/Single/MovieRates";
import { Movies } from "../Data/MovieData";
import Layout from "../Layout/Layout";
import ShareMovieModal from "../components/modals/ShareModal";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const movie = Movies.find((movie) => movie.name === id);
  return (
    <Layout>
      <ShareMovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        movie={movie}
      />
      <MovieInfo movie={movie} setModalOpen={setModalOpen} />
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts />
        {/* rate */}
        <MovieRates movie={movie} />
      </div>
    </Layout>
  );
}

export default SingleMovie;
