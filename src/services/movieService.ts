import axios from 'axios';

// Get popular movies
export const fetchPopularMovies = async (pageNum = 1) => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular',
    {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODgyM2EyOTQ1YThjZTkwNjRjNTE3OTk5NWQ1M2EyZSIsIm5iZiI6MTczMDIwMTcxMi4wNjEzNzYsInN1YiI6IjYxMTY3YTg1OTlkNWMzMDAyNjM3ZDY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMlQ_LPOIl1Z6HvnM3yDXoGTQ9JG1G-xEXI2-WMvdY',
      },
      params: {
        language: 'en-US',
        page: pageNum,
      },
    },
  );

  return response.data;
};

// Get trending movies
export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day',
    {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODgyM2EyOTQ1YThjZTkwNjRjNTE3OTk5NWQ1M2EyZSIsIm5iZiI6MTczMDIwMTcxMi4wNjEzNzYsInN1YiI6IjYxMTY3YTg1OTlkNWMzMDAyNjM3ZDY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMlQ_LPOIl1Z6HvnM3yDXoGTQ9JG1G-xEXI2-WMvdY',
      },
      params: {
        language: 'en-US',
      },
    },
  );

  return response.data;
};

// Get genre names of movies
export const fetchGenreNamesofMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list',
    {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODgyM2EyOTQ1YThjZTkwNjRjNTE3OTk5NWQ1M2EyZSIsIm5iZiI6MTczMDIwMTcxMi4wNjEzNzYsInN1YiI6IjYxMTY3YTg1OTlkNWMzMDAyNjM3ZDY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMlQ_LPOIl1Z6HvnM3yDXoGTQ9JG1G-xEXI2-WMvdY',
      },
      params: {
        language: 'en-US',
      },
    },
  );

  return response.data;
};

// Search movies
export const fetchSearchMovies = async (searchQuery: string, pageNum = 1) => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODgyM2EyOTQ1YThjZTkwNjRjNTE3OTk5NWQ1M2EyZSIsIm5iZiI6MTczMDIwMTcxMi4wNjEzNzYsInN1YiI6IjYxMTY3YTg1OTlkNWMzMDAyNjM3ZDY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUMlQ_LPOIl1Z6HvnM3yDXoGTQ9JG1G-xEXI2-WMvdY',
      },
      params: {
        language: 'en-US',
        query: searchQuery,
        page: pageNum,
      },
    },
  );

  return response.data;
};
