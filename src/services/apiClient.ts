import axios from 'axios';
import {TMDB_API_TOKEN} from '@env';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
});

export default apiClient;
