import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {StatusBar} from 'react-native';
import {useAppTheme} from '../hooks/useAppTheme';
import {storage} from '../utils/storageUtils';

export interface FavoritesContextType {
  favoriteMovieIds: string[];
  saveFavoriteMovieId: (movieId: string) => void;
  removeFavoriteMovieId: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: ReactNode;
}

const FAVORITES_KEY = 'favorite-movie-ids';

export const FavoriteMoviesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const {theme} = useAppTheme();
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<string[]>([]);

  // Load favorite movie IDs from local storage on initial mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const jsonValue = storage.getString(FAVORITES_KEY);

        if (jsonValue != null) {
          setFavoriteMovieIds(JSON.parse(jsonValue));
        }
      } catch (error) {
        console.error('Error loading favorite movie IDs:', error);
      }
    };

    loadFavorites();
  }, []);

  // Save a new favorite movie ID
  const saveFavoriteMovieId = (movieId: string) => {
    try {
      if (!favoriteMovieIds.includes(movieId)) {
        const updatedFavorites = [...favoriteMovieIds, movieId];
        setFavoriteMovieIds(updatedFavorites);
        storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error saving favorite movie ID:', error);
    }
  };

  // Remove a favorite movie ID
  const removeFavoriteMovieId = (movieId: string) => {
    try {
      const favoriteMovieIds = JSON.parse(
        storage.getString(FAVORITES_KEY) || '[]',
      ) as Array<string>;

      const updatedFavorites = favoriteMovieIds.filter(id => id != movieId);

      setFavoriteMovieIds(updatedFavorites);
      storage.set(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite movie ID:', error);
    }
  };

  // Is movie ID is in the favorites list
  const isFavorite = (movieId: string): boolean => {
    return favoriteMovieIds.includes(movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteMovieIds,
        saveFavoriteMovieId,
        removeFavoriteMovieId,
        isFavorite,
      }}>
      <StatusBar
        backgroundColor={theme.colors.surface}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      {children}
    </FavoritesContext.Provider>
  );
};
