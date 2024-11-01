import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import '../../i18n';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {theme} = useAppTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     // const token = await AsyncStorage.getItem('userToken');
  //     const token = true;
  //     setIsAuthenticated(!!token);
  //     setLoading(false);
  //   };

  //   checkAuthStatus();
  // }, []);

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
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
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
