import React from 'react';
import {useTheme} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeIcon from '../assets/icons/Home.svg';
import SearchIcon from '../assets/icons/Search.svg';
import FavoritesIcon from '../assets/icons/Favorites.svg';
import SettingsIcon from '../assets/icons/Settings.svg';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: theme.colors.elevation.level1,
          // elevation: 0,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          fontFamily: 'Inter-VariableFont_opsz,wght',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <HomeIcon width={24} height={24} fill={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <SearchIcon width={24} height={24} fill={color} />
          ),
          tabBarLabel: 'Search',
          headerShown: true,
          headerStyle: {backgroundColor: theme.colors.surface},
          headerTintColor: theme.colors.onSurface,
          headerTitleStyle: {fontWeight: '700', fontSize: 18},
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <FavoritesIcon width={24} height={24} fill={color} />
          ),
          tabBarLabel: 'Favorites',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <SettingsIcon width={24} height={24} fill={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
