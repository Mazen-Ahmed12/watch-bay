import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetails, useMovieReviews } from "../api/queries";
import ShareMovieModal from "../components/modals/ShareModal";
import MovieCasts from "../components/SingleMovie/MovieCasts";
import MovieInfo from "../components/SingleMovie/MovieInfo";
import MovieRates from "../components/SingleMovie/MovieRates";
import Layout from "../Layout/Layout";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Use the new query hooks
  const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useMovieDetails(id);
  const { data: reviews = { results: [] }, isLoading: isReviewsLoading, isError: isReviewsError } = useMovieReviews(id);

  const isLoading = isMovieLoading || isReviewsLoading;
  const error = isMovieError || isReviewsError ? 'Failed to load movie data. Please try again later.' : null;

  if (!id) {
    navigate('/');
    return null;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <FaSpinner className="mb-4 text-4xl animate-spin text-subMain" />
            <p className="text-lg">Loading movie details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <div className="container py-20 mx-auto text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-500">Error loading movie</h2>
          <p className="mb-6">{error || 'Movie not found'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-white rounded border transition-all bg-subMain hover:bg-transparent border-subMain"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <ShareMovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        movie={{
          ...movie,
          name: movie.title,
        }}
      />
      <MovieInfo 
        movie={{
        ...movie,
        name: movie.title,
          image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
          release_date: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
          runtime: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A',
          genres: movie.genres?.map(g => g.name).join(', ') || 'N/A'
        }} 
        setModalOpen={setModalOpen} 
      />
      <div className="container px-2 mx-auto my-6 min-h-screen">
        <MovieCasts casts={movie.credits?.cast || []} />
        <MovieRates movie={movie} reviews={reviews} />
      </div>
    </Layout>
  );
}

export default SingleMovie;
