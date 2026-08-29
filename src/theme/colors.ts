import { useColorScheme } from 'react-native';

export const COLORS = {
  light: {
    // Backgrounds
    bgPrimary: '#F7F3ED',
    bgSecondary: '#FFFFFF',
    bgTertiary: '#EDE7DE',

    // Text
    textPrimary: '#1A1815',
    textSecondary: '#9B9087',

    // Accents
    accentPrimary: '#A85C2C',
    accentSecondary: '#3D5C2F',

    // Borders & Shadows
    borderColor: '#E8E1D7',
    shadowColor: '#1A1815',
  },
  dark: {
    // Backgrounds
    bgPrimary: '#1A1815',
    bgSecondary: '#2A2620',
    bgTertiary: '#3A3430',

    // Text
    textPrimary: '#F7F3ED',
    textSecondary: '#B8A89D',

    // Accents
    accentPrimary: '#D9894F',
    accentSecondary: '#6BAB55',

    // Borders & Shadows
    borderColor: '#3A3430',
    shadowColor: '#000000',
  },
};

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? COLORS.dark : COLORS.light;
};
