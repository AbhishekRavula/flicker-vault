import React, {createContext, useState, ReactNode, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  PaperProvider,
  MD3Theme,
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
} from 'react-native-paper';
import {storage} from '../utils/storageUtils';

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
  colors: {
    ...MD3LightTheme.colors,
    primary: '#32A873',
    onSurfaceVariant: '#969696',
  },
};

const DarkerTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts: configureFonts({config: fontConfig}),
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#32A873',
    surface: '#121212',
    onSurface: '#F3F3F3',
    onSurfaceVariant: '#969696',
  },
};

const APP_THEME_KEY = 'app-theme';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState<'light' | 'dark'>(getAppTheme);

  function getAppTheme() {
    const storedTheme = storage.getString(APP_THEME_KEY) as
      | 'light'
      | 'dark'
      | null;

    return storedTheme || colorScheme || 'light';
  }

  const toggleTheme = () => {
    const updatedTheme = appTheme === 'light' ? 'dark' : 'light';
    setAppTheme(updatedTheme);
    storage.set(APP_THEME_KEY, updatedTheme);
  };

  const theme = appTheme === 'dark' ? DarkerTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
