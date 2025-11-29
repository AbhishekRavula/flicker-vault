import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {useAuth} from '../hooks/useAuth';

function RootNavigator() {
  const {isLoggedIn} = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default RootNavigator;
