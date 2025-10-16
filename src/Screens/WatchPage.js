import { useMemo } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useMovieVideos } from "../api/queries";
import Layout from "../Layout/Layout";

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();


  const {
    data: videosData,
    isLoading: isVideosLoading,
    isError: isVideosError,
  } = useMovieVideos(id);

  // Filter YouTube videos
  const youtubeVideos = useMemo(() => {
    if (!videosData?.results) return [];
    return videosData.results.filter(
      (video) =>
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
    );
    }, [videosData]);

  const isLoading = isVideosLoading;
  const error =
    isVideosError
      ? "Failed to load movie data. Please try again later."
      : null;

  if (!id) {
    navigate("/");
    return null;
  }

  return (
    <Layout>
      <div className="container p-6 mx-auto mb-12 bg-dry">
        <div className="flex-wrap gap-2 p-6 mb-6 rounded border border-gray-800 flex-btn bg-main">
          <button
            onClick={() => navigate(-1)}
            className="flex gap-3 items-center text-sm font-bold md:text-xl text-dryGray hover:text-subMain transitions"
          >
            <BiArrowBack /> Back to Movie
          </button>
          <div className="gap-5 w-full flex-btn sm:w-auto">
            <button
              onClick={() =>
                navigate("/favorites", { state: { movieId: id } })
              }
              className="w-12 h-12 text-white bg-white bg-opacity-30 rounded-full flex-colo transitions hover:bg-subMain"
            >
              <FaHeart />
            </button>
            <button className="gap-2 px-8 py-3 text-sm font-medium text-white rounded bg-subMain flex-rows hover:text-main transitions">
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
          <div className="w-full h-96 text-red-500 flex-colo">error....</div>
        ) : youtubeVideos.length > 0 ? (
          <div className="overflow-hidden w-full h-full rounded-lg">
            <div className="relative pt-[56.25%] h-0 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideos[0].key}?autoplay=1`}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={youtubeVideos[0]?.name || "Movie Trailer"}
              />
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default WatchPage;
