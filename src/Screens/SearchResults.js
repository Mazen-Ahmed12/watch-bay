import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbAPI } from '../api/tmdb';
import Movie from '../components/Movie';
import Layout from '../Layout/Layout';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const data = await tmdbAPI.searchMovies(query);
        setResults(data.results || []);
        setError(null);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError('Failed to fetch search results');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Searching for "{query}"...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">
        Search Results for: <span className="text-subMain">{query}</span>
      </h1>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-white text-center py-12">
          <p className="text-xl">No results found for "{query}"</p>
          <p className="text-gray-400 mt-2">Try different keywords or check for typos</p>
        </div>
      )}
    </div>
  </Layout>
  );
};

export default SearchResults;
