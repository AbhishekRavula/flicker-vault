import apiClient from './apiClient';

// Get popular movies
export const fetchPopularMovies = async (pageNum = 1) => {
  try {
    const response = await apiClient.get('/movie/popular', {
      params: {language: 'en-US', page: pageNum},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Get trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await apiClient.get('/trending/movie/day', {
      params: {language: 'en-US'},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Get genre names of movies
export const fetchGenreNamesofMovies = async () => {
  try {
    const response = await apiClient.get('/genre/movie/list', {
      params: {language: 'en-US'},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching genre names:', error);
    throw error;
  }
};

// Search movies
export const fetchSearchMovies = async (searchQuery: string, pageNum = 1) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {language: 'en-US', query: searchQuery, page: pageNum},
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw error;
  }
};

// Fetch movie details by ID
export const fetchMovieDetailsById = async (movieId: string) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {language: 'en-US'},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
