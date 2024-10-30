import {View, Text} from 'react-native';
import React from 'react';
import LandingScreen from '../screens/Auth/LandingScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Landing" component={LandingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;