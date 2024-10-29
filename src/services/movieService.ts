import axios from 'axios';

// Get popular movies
export const fetchPopularMovies = async (pageParam = 1) => {
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
        page: pageParam,
      },
    },
  );

  return response.data;
};
