import React from 'react';
import {StyleSheet, View} from 'react-native';
import '../../i18n';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import {Genre, GenreContext} from '../contexts/GenreContext';
import {useQuery} from '@tanstack/react-query';
import {fetchGenreNamesofMovies} from '../services/movieService';
import {useAppTheme} from '../hooks/useAppTheme';
import {FavoriteMoviesProvider} from '../contexts/FavoriteMoviesContext';
import {RootStackParamList} from '../constants/types';
import {useAuth} from '../hooks/useAuth';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {theme} = useAppTheme();
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
    <NavigationContainer>
      {isLoggedIn ? (
        <FavoriteMoviesProvider>
          <GenreContext.Provider value={genres.data || {}}>
            <RootStack.Navigator>
              <RootStack.Screen
                name="Main"
                component={AppNavigator}
                options={{headerShown: false}}
              />
              <RootStack.Screen
                name="Details"
                component={DetailsScreen}
                options={{
                  headerStyle: {backgroundColor: theme.colors.surface},
                  headerTintColor: theme.colors.onSurface,
                  headerTitleStyle: styles.headerTitle,
                  headerTitleAlign: 'center',
                }}
              />
            </RootStack.Navigator>
          </GenreContext.Provider>
        </FavoriteMoviesProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
