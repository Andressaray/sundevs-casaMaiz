import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, AppearanceProvider, Appearance } from 'react-native';
import { COLORS } from './colors';

/**
 * Tipos de tema soportados
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Contexto del tema
 */
interface ThemeContextType {
  // Tema actual
  currentTheme: 'light' | 'dark';
  themeMode: ThemeMode;
  
  // Acciones
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  
  // Colores
  colors: typeof COLORS.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider del tema - envuelve la app
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');

  // Determina el tema actual basado en la configuración y preferencia del sistema
  const currentTheme = (() => {
    if (themeMode === 'auto') {
      return systemColorScheme === 'dark' ? 'dark' : 'light';
    }
    return themeMode;
  })();

  const colors = currentTheme === 'dark' ? COLORS.dark : COLORS.light;

  const toggleTheme = () => {
    setThemeMode(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const value: ThemeContextType = {
    currentTheme,
    themeMode,
    setThemeMode,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook para usar el contexto del tema
 * Debe estar dentro de ThemeProvider
 */
export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

/**
 * Hook para obtener solo los colores (compatible con código existente)
 */
export const useThemeColors = () => {
  const { colors } = useAppTheme();
  return colors;
};

/**
 * Hook para saber si estamos en dark mode
 */
export const useDarkMode = (): boolean => {
  const { currentTheme } = useAppTheme();
  return currentTheme === 'dark';
};
