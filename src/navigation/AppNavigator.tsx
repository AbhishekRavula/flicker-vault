import React from 'react';
import {StyleSheet} from 'react-native';
import {FavoriteMoviesProvider} from '../contexts/FavMoviesContext';
import {GenresProvider} from '../contexts/GenresContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../constants/types';
import DetailsScreen from '../screens/DetailsScreen';
import {useAppTheme} from '../hooks/useAppTheme';
import BottomTabNavigator from './BottomTabNavigator';

const AppStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {theme} = useAppTheme();

  return (
    <FavoriteMoviesProvider>
      <GenresProvider>
        <AppStack.Navigator>
          <AppStack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <AppStack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              headerStyle: {backgroundColor: theme.colors.surface},
              headerTintColor: theme.colors.onSurface,
              headerTitleStyle: styles.headerTitle,
              headerTitleAlign: 'center',
            }}
          />
        </AppStack.Navigator>
      </GenresProvider>
    </FavoriteMoviesProvider>
  );
};

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

export default AppNavigator;
