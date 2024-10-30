import * as React from 'react';
import {useColorScheme} from 'react-native';
import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';

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

function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootNavigator />
      </PaperProvider>
    </QueryClientProvider>
  );
}
export default App;
