import {useContext} from 'react';
import {
  FavoritesContext,
  FavoritesContextType,
} from '../contexts/FavMoviesContext';

// Custom hook for using the FavoritesContext
export const useFavoriteMovies = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavoriteMovies must be used within a FavoriteMoviesProvider',
    );
  }
  return context;
};
