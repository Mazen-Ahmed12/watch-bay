import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaYoutube } from "react-icons/fa";
import { tmdbAPI } from "../api/tmdb";

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details and videos
  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) {
        setError('No movie ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch movie details
        const movieData = await tmdbAPI.getMovieDetails(id);
        setMovie(movieData);
        
        // Fetch movie videos
        const videosData = await tmdbAPI.getMovieVideos(id);
        
        if (videosData?.results) {
          const youtubeVideos = videosData.results.filter(
            (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
          );
          setVideos(youtubeVideos);
        }
        
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);
  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <button
            onClick={() => navigate(-1)}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray hover:text-subMain transitions"
          >
            <BiArrowBack /> Back to Movie
          </button>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button className="bg-white hover:text-subMain transitions bg-opacity-30 text-white rounded px-4 py-3 text-sm">
              <FaHeart />
            </button>
            <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
              <FaCloudDownloadAlt /> Download
            </button>
          </div>
        </div>

        {/* watch video */}
        {loading ? (
          <div className="w-full h-96 flex-colo">
            <div className="spinner">Loading...</div>
          </div>
        ) : error ? (
          <div className="w-full h-96 flex-colo text-red-500">
            {error}
          </div>
        ) : videos.length > 0 ? (
          <div className="w-full h-full rounded-lg overflow-hidden">
            <div className="relative pt-[56.25%] h-0 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videos[0].name}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default WatchPage;
