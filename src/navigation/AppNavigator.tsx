import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeIcon from '../assets/icons/Home.svg';
import SearchIcon from '../assets/icons/Search.svg';
import FavoritesIcon from '../assets/icons/Favorites.svg';
import SettingsIcon from '../assets/icons/Settings.svg';
import {useAppTheme} from '../hooks/useAppTheme';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {TabParamList} from '../constants/types';

const Tab = createBottomTabNavigator<TabParamList>();

function AppNavigator() {
  const {theme} = useAppTheme();
  const {t} = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          ...styles.tabBarStyle,
          backgroundColor: theme.colors.elevation.level1,
        },
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerStyle: {backgroundColor: theme.colors.surface},
        headerTintColor: theme.colors.onSurface,
        headerTitleStyle: {fontWeight: '700', fontSize: 18},
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        name={t('Home') as 'Home'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <HomeIcon width={24} height={24} fill={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={t('Search') as 'Search'}
        component={SearchScreen}
        options={{
          tabBarIcon: ({color}) => (
            <SearchIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name={t('Favorites') as 'Favorites'}
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FavoritesIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name={t('Settings') as 'Settings'}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({color}) => (
            <SettingsIcon width={24} height={24} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
    // elevation: 0,
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter-VariableFont_opsz,wght',
  },
});

export default AppNavigator;
