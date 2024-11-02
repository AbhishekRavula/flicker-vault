import {useContext} from 'react';
import {GenreContext} from '../contexts/GenresContext';

// custom hook to use genre context
export const useGenres = () => {
  return useContext(GenreContext);
};
