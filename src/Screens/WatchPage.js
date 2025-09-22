import { useMemo } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieDetails, useMovieVideos } from "../api/queries";
import Layout from "../Layout/Layout";

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use the new query hooks
  const { data: movie, isLoading: isMovieLoading, isError: isMovieError } = useMovieDetails(id);
  const { data: videosData, isLoading: isVideosLoading, isError: isVideosError } = useMovieVideos(id);

  // Filter YouTube videos
  const youtubeVideos = useMemo(() => {
    if (!videosData?.results) return [];
    return videosData.results.filter(
      (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
    );
  }, [videosData]);

  const isLoading = isMovieLoading || isVideosLoading;
  const error = isMovieError || isVideosError 
    ? 'Failed to load movie data. Please try again later.' 
    : null;

  if (!id) {
    navigate('/');
    return null;
  }

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
        {isLoading ? (
          <div className="w-full h-96 flex-colo">
            <div className="spinner">Loading...</div>
          </div>
        ) : error ? (
          <div className="w-full h-96 flex-colo text-red-500">
            {error}
          </div>
        ) : youtubeVideos.length > 0 ? (
          <div className="w-full h-full rounded-lg overflow-hidden">
            <div className="relative pt-[56.25%] h-0 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideos[0].key}?autoplay=1`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={youtubeVideos[0]?.name || 'Movie Trailer'}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default WatchPage;
