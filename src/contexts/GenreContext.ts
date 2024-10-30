import {createContext, useContext} from 'react';

export interface Genre {
  id: number;
  name: string;
}

export const GenreContext = createContext<Record<number, string>>({});

// custom hook to use genre context
export const useGenres = () => {
  return useContext(GenreContext);
};
