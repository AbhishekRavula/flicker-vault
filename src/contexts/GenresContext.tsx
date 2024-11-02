import {useQuery} from '@tanstack/react-query';
import {createContext, ReactNode} from 'react';
import {fetchGenreNamesofMovies} from '../services/movieService';
import {useAuth} from '../hooks/useAuth';

export interface Genre {
  id: number;
  name: string;
}

interface GenresProviderProps {
  children: ReactNode;
}

export const GenreContext = createContext<Record<number, string>>({});

export const GenresProvider: React.FC<GenresProviderProps> = ({children}) => {
  const {isLoggedIn} = useAuth();

  const genres = useQuery({
    queryKey: ['genreNamesofMovies'],
    queryFn: fetchGenreNamesofMovies,
    select: data => {
      const genres = (data?.genres || []) as Genre[];
      return genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {} as Record<number, string>);
    },
    enabled: isLoggedIn,
  });

  return (
    <GenreContext.Provider value={genres.data || {}}>
      {children}
    </GenreContext.Provider>
  );
};
