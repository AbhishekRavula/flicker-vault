import * as React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import RootNavigator from './navigation/RootNavigator';
import {ThemeProvider} from './contexts/ThemeContext';

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