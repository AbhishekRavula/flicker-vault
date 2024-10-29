/**
 * @format
 */

import * as React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {name as appName} from './app.json';
import App from './App';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const fontConfig = {
  fontFamily: 'Inter-VariableFont_opsz,wght',
};

const lightTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
};

const darkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({config: fontConfig}),
};

export default function Main() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
