import { useColorScheme } from 'react-native';

/**
 * Paleta de colores completa para Dark & Light Mode
 * Basada en diseño de restaurante con máxima accesibilidad
 */
export const COLORS = {
  light: {
    // Backgrounds - Jerarquía visual
    bgPrimary: '#F7F3ED',        // Fondo principal (beige claro)
    bgSecondary: '#FFFFFF',      // Cards, componentes
    bgTertiary: '#EDE7DE',       // Superficies terciarias
    bgQuaternary: '#E3DCD1',     // Fondo de inputs

    // Text - Contraste óptimo (WCAG AA/AAA)
    textPrimary: '#1A1815',      // Texto principal (casi negro)
    textSecondary: '#6B5E54',    // Texto secundario
    textTertiary: '#9B9087',     // Texto deshabilitado/suave
    textInverse: '#F7F3ED',      // Texto sobre fondos oscuros

    // Accents - Paleta restaurante
    accentPrimary: '#A85C2C',    // Marrón cálido principal
    accentPrimaryLight: '#D4A574', // Marrón claro (hover/focus)
    accentSecondary: '#C65D3B',  // Terracota
    accentTertiary: '#8B6F47',   // Marrón oscuro

    // Semantic Colors
    success: '#2DA545',          // Verde éxito
    warning: '#F5A623',          // Naranja advertencia
    error: '#D9534F',            // Rojo error
    info: '#5B9BD5',             // Azul información

    // Borders & Dividers
    borderColor: '#E8E1D7',
    borderColorStrong: '#D9CFB8',
    dividerColor: '#EDE7DE',

    // Shadows
    shadowColor: '#1A1815',
    shadowColorLight: '#9B9087',
  },
  dark: {
    // Backgrounds - Diseño nocturno elegante
    bgPrimary: '#0F0D0B',        // Fondo muy oscuro
    bgSecondary: '#1A1815',      // Cards principales
    bgTertiary: '#2A2620',       // Superficies terciarias
    bgQuaternary: '#352F29',     // Fondo de inputs

    // Text - Alto contraste en dark mode
    textPrimary: '#F7F3ED',      // Texto principal (blanco/beige)
    textSecondary: '#D9CFB8',    // Texto secundario
    textTertiary: '#9B9087',     // Texto suave
    textInverse: '#1A1815',      // Texto sobre fondos claros

    // Accents - Versión caliente para dark mode
    accentPrimary: '#D9894F',    // Marrón/naranja más brillante
    accentPrimaryLight: '#E8A86A', // Marrón claro (hover/focus)
    accentSecondary: '#E07856',  // Terracota más brillante
    accentTertiary: '#A87560',   // Marrón más claro

    // Semantic Colors
    success: '#4CAF50',          // Verde más brillante
    warning: '#FFB74D',          // Naranja más brillante
    error: '#EF5350',            // Rojo más brillante
    info: '#64B5F6',             // Azul más brillante

    // Borders & Dividers
    borderColor: '#352F29',
    borderColorStrong: '#4A4238',
    dividerColor: '#2A2620',

    // Shadows
    shadowColor: '#000000',
    shadowColorLight: '#4A4238',
  },
};

/**
 * Hook para obtener los colores del tema actual
 * Se actualiza automáticamente cuando cambia el modo
 */
export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? COLORS.dark : COLORS.light;
};

/**
 * Hook para obtener ambos temas (útil en algunos contextos)
 */
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? COLORS.dark : COLORS.light;
  
  return {
    colors,
    isDark,
    isLight: !isDark,
    colorScheme: colorScheme || 'light',
  };
};

/**
 * Helper para obtener color con opacidad
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Convierte hex a rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
