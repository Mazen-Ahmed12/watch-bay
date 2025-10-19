import { useSearchParams } from "react-router-dom";
import { useSearchMovies } from "../api/queries";
import Movie from "../components/Movie";
import Layout from "../Layout/Layout";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const { data, isLoading, isError } = useSearchMovies(query, 1);
  const results = data?.results || [];
  const error = isError ? "Failed to fetch search results" : null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-white">Searching for "{query}"...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto min-h-screen">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Search Results for: <span className="text-subMain">{query}</span>
        </h1>

        {results.length > 0 ? (
          <div className="flex flex-col gap-8 justify-center mt-6 sm:mt-10 sm:flex-row sm:flex-wrap">
            {results.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-white">
            <p className="text-xl">No results found for "{query}"</p>
            <p className="mt-2 text-gray-400">
              Try different keywords or check for typos
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
