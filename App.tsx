import * as React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';
import {ThemeProvider} from './src/contexts/ThemeContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
export default App;
