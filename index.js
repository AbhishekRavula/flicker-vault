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
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
