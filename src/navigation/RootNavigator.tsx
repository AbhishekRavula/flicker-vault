import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import {GenresProvider} from '../contexts/GenresContext';
import {useAppTheme} from '../hooks/useAppTheme';
import {FavoriteMoviesProvider} from '../contexts/FavMoviesContext';
import {RootStackParamList} from '../constants/types';
import {useAuth} from '../hooks/useAuth';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const {theme} = useAppTheme();
  const {isLoggedIn} = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <FavoriteMoviesProvider>
          <GenresProvider>
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
          </GenresProvider>
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
