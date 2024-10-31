import {useContext} from 'react';
import {
  FavoritesContext,
  FavoritesContextType,
} from '../contexts/FavoriteMoviesContext';

// Custom hook for using the FavoritesContext
export const useFavoriteMovies = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
