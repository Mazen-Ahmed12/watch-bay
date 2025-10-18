import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { tmdbAPI } from './tmdb';

// Movies

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => tmdbAPI.getPopularMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  });
};

export const useTrendingMovies = (timeWindow = 'day') => {
  return useQuery({
    queryKey: ['trendingMovies', timeWindow],
    queryFn: () => tmdbAPI.getTrending(timeWindow),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useMovieDetails = (movieId) => {
  return useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: () => tmdbAPI.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useSearchMovies = (query, page = 1) => {
  return useQuery({
    queryKey: ['searchMovies', query, page],
    queryFn: () => tmdbAPI.searchMovies(query, page),
    enabled: !!query,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTopRatedMovies = (page = 1) => {
  return useQuery({
    queryKey: ['topRatedMovies', page],
    queryFn: () => tmdbAPI.getTopRatedMovies(page),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useMovieImages = (movieId) => {
  return useQuery({
    queryKey: ['movieImages', movieId],
    queryFn: () => tmdbAPI.getMovieImages(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export const useMovieCredits = (movieId) => {
  return useQuery({
    queryKey: ['movieCredits', movieId],
    queryFn: () => tmdbAPI.getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useMovieVideos = (movieId) => {
  return useQuery({
    queryKey: ['movieVideos', movieId],
    queryFn: () => tmdbAPI.getMovieVideos(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useMovieReviews = (movieId) => {
  return useQuery({
    queryKey: ['movieReviews', movieId],
    queryFn: () => tmdbAPI.getMovieReviews(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => tmdbAPI.getGenres(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

// Discover movies with filters
export const useInfinitePopularMovies = () => {
  return useInfiniteQuery({
    queryKey: ['infinitePopularMovies'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await tmdbAPI.getPopularMovies(pageParam);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= (lastPage?.total_pages || 1) ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Discover movies with filters (infinite scroll)
export const useInfiniteDiscoverMovies = (filters) => {
  return useInfiniteQuery({
    queryKey: ['infiniteDiscoverMovies', filters],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await tmdbAPI.discoverMovies({ ...filters, page: pageParam });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= (lastPage?.total_pages || 1) ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
  });
};

export const useCounts = () => {
  return useQuery({
    queryKey: ['counts'],
    queryFn: () => tmdbAPI.getCounts(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
