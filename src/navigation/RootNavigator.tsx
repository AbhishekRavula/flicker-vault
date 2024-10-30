import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import '../../i18n';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import {Movie} from '../screens/HomeScreen';
import {Genre, GenreContext} from '../contexts/GenreContext';
import {useQuery} from '@tanstack/react-query';
import {fetchGenreNamesofMovies} from '../services/movieService';

export type RootStackParamList = {
  Details: {movie: Movie};
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const theme = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // const token = await AsyncStorage.getItem('userToken');
      const token = true;
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const genres = useQuery({
    queryKey: ['genreNamesofMovies'],
    queryFn: fetchGenreNamesofMovies,
    enabled: isAuthenticated,
    select: data => {
      const genres = (data?.genres || []) as Genre[];
      return genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {} as Record<number, string>);
    },
  });

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading..</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
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
                headerStyle: {
                  backgroundColor: theme.colors.surface,
                },
                headerTintColor: theme.colors.onSurface,
                headerTitleStyle: {
                  fontWeight: '700',
                  fontSize: 18,
                },
                headerTitleAlign: 'center',
              }}
            />
          </RootStack.Navigator>
        </GenreContext.Provider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default RootNavigator;
