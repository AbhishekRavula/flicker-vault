import React, {createContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoritesContextType {
  favoriteMovieIds: string[];
  saveFavoriteMovieId: (movieId: string) => Promise<void>;
  removeFavoriteMovieId: (movieId: string) => Promise<void>;
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
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<string[]>([]);

  // Load favorite movie IDs from AsyncStorage on initial mount
  useEffect(() => {
    const loadFavorites = async () => {
      console.log('loadFavorites');

      try {
        const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);

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
  const saveFavoriteMovieId = async (movieId: string) => {
    try {
      if (!favoriteMovieIds.includes(movieId)) {
        const updatedFavorites = [...favoriteMovieIds, movieId];
        setFavoriteMovieIds(updatedFavorites);
        await AsyncStorage.setItem(
          FAVORITES_KEY,
          JSON.stringify(updatedFavorites),
        );
      }
    } catch (error) {
      console.error('Error saving favorite movie ID:', error);
    }
  };

  // Remove a favorite movie ID
  const removeFavoriteMovieId = async (movieId: string) => {
    try {
      const updatedFavorites = favoriteMovieIds.filter(id => id != movieId);
      setFavoriteMovieIds(updatedFavorites);
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
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
      {children}
    </FavoritesContext.Provider>
  );
};
