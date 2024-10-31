import {useContext} from 'react';
import {ThemeContext, ThemeContextType} from '../contexts/ThemeContext';

// Custom hook to use the ThemeContext
export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
