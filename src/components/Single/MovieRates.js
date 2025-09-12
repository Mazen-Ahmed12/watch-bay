import Rating from "@mui/material/Rating";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { BsBookmarkStarFill, BsPersonCircle } from "react-icons/bs";
import Titles from "../Titles";

function MovieRates({ movie, reviews }) {
  const reviewCount = reviews?.results?.length || 0;

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };

  // Calculate average rating from reviews
  const averageRating = reviews?.results?.length
    ? reviews.results.reduce(
        (acc, review) => acc + (review.author_details.rating || 0),
        0
      ) / reviews.results.length
    : 0;
  const Ratings = [
    {
      title: "0 - Poor",
      value: 0,
    },
    {
      title: "1 - Fair",
      value: 1,
    },
    {
      title: "2 - Good",
      value: 2,
    },
    {
      title: "3 - Very Good",
      value: 3,
    },
    {
      title: "4 - Excellent",
      value: 4,
    },
    {
      title: "5 - Masterpiece",
      value: 5,
    },
  ];

  const [rating, setRating] = useState(0);

  return (
    <div className="my-12">
      <Titles title="Movie Reviews" Icon={BsBookmarkStarFill} className="mb-2" />
      <p className="text-gray-400 text-sm mb-8 text-center">
        Share your thoughts and read what others have to say
      </p>
      
      <div className="bg-dry rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Write Review Section */}
          <div className="md:w-1/3 p-8 bg-gradient-to-br from-subMain/5 to-main/50">
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Write a Review
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    <Rating
                      name="rating"
                      value={rating}
                      onChange={(e, newValue) => setRating(newValue)}
                      precision={0.5}
                      size="large"
                      className="text-3xl"
                    />
                    <span className="text-sm text-gray-400 ml-2">
                      {rating > 0 ? `${rating}/5` : 'Rate this'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Review
                  </label>
                  <textarea
                    placeholder="Share your thoughts about this movie..."
                    rows="4"
                    className="w-full px-4 py-3 bg-main border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-subMain focus:border-transparent transition-all"
                  />
                </div>
                
                <button className="w-full bg-subMain hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="md:w-2/3 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
                </h3>
                {reviewCount > 0 && (
                  <div className="flex items-center mt-1">
                    <Rating
                      value={averageRating / 2}
                      precision={0.1}
                      readOnly
                      size="medium"
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-400">
                      {averageRating.toFixed(1)}/10 • {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select className="bg-main border border-gray-700 text-white text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-subMain focus:border-transparent">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {reviewCount > 0 ? (
                reviews.results.map((review) => (
                  <div 
                    key={review.id}
                    className="bg-main/50 rounded-xl p-6 border border-gray-800 hover:border-subMain/30 transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-subMain/10 flex items-center justify-center">
                        <BsPersonCircle className="text-2xl text-subMain" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-white">
                            {review.author}
                          </h4>
                          {review.author_details.rating && (
                            <div className="flex items-center">
                              <Rating
                                value={review.author_details.rating / 2}
                                precision={0.5}
                                readOnly
                                size="small"
                                className="text-amber-400"
                              />
                              <span className="ml-1 text-sm text-gray-400">
                                ({review.author_details.rating.toFixed(1)}/10)
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-400 mt-1">
                          {formatDate(review.created_at)}
                        </p>
                        
                        <p className="mt-3 text-gray-300 leading-relaxed">
                          {review.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-main/30 rounded-xl">
                  <BsBookmarkStarFill className="mx-auto text-4xl text-gray-600 mb-4" />
                  <h4 className="text-xl font-semibold text-gray-300">No Reviews Yet</h4>
                  <p className="text-gray-500 mt-2 max-w-md mx-auto">
                    Be the first to share your thoughts about this movie. Your review could help others decide what to watch!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </div>
  );
}

export default MovieRates;
