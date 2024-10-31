import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, ReactNode, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  PaperProvider,
  MD3Theme,
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
} from 'react-native-paper';

export interface ThemeContextType {
  theme: MD3Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: ReactNode;
}

// setting app font as Inter
const fontConfig = {
  fontFamily: 'Inter-VariableFont_opsz,wght',
};

const LightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
};

const DarkerTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts: configureFonts({config: fontConfig}),
};

const APP_THEME_KEY = 'app-theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const loadThemePreference = async () => {
      const storedTheme = (await AsyncStorage.getItem(APP_THEME_KEY)) as
        | 'light'
        | 'dark'
        | null;
      setAppTheme(storedTheme || colorScheme || 'light');
    };

    loadThemePreference();
  }, [colorScheme]);

  const toggleTheme = async () => {
    const updatedTheme = appTheme === 'light' ? 'dark' : 'light';
    setAppTheme(updatedTheme);
    await AsyncStorage.setItem(APP_THEME_KEY, updatedTheme);
  };

  const theme = appTheme === 'dark' ? DarkerTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
