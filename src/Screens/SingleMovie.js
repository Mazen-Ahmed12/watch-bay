import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { tmdbAPI } from "../api/tmdb";
import ShareMovieModal from "../components/modals/ShareModal";
import MovieCasts from "../components/Single/MovieCasts";
import MovieInfo from "../components/Single/MovieInfo";
import MovieRates from "../components/Single/MovieRates";
import Layout from "../Layout/Layout";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        // Fetch movie details and reviews in parallel
        const [movieData, reviewsData] = await Promise.all([
          tmdbAPI.getMovieDetails(id),
          tmdbAPI.getMovieReviews(id)
        ]);
        setMovie(movieData);
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-4xl text-subMain mb-4" />
            <p className="text-lg">Loading movie details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <div className="container mx-auto text-center py-20">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading movie</h2>
          <p className="mb-6">{error || 'Movie not found'}</p>
          <button 
            onClick={() => navigate(-1)}
            className="bg-subMain text-white px-6 py-2 rounded hover:bg-transparent border border-subMain transition-all"
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
      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts casts={movie.credits?.cast || []} />
        <MovieRates movie={movie} reviews={reviews} />
      </div>
    </Layout>
  );
}

export default SingleMovie;
