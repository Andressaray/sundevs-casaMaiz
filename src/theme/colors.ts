import { useColorScheme } from "react-native";

export const COLORS = {
  light: {
    bgPrimary: "#F7F3ED",
    bgSecondary: "#FFFFFF",
    bgTertiary: "#EDE7DE",
    bgQuaternary: "#E3DCD1",
    textPrimary: "#1A1815",
    textSecondary: "#6B5E54",
    textTertiary: "#9B9087",
    textInverse: "#F7F3ED",
    accentPrimary: "#A85C2C",
    accentPrimaryLight: "#D4A574",
    accentSecondary: "#C65D3B",
    accentTertiary: "#8B6F47",
    success: "#2DA545",
    warning: "#F5A623",
    error: "#D9534F",
    info: "#5B9BD5",
    borderColor: "#E8E1D7",
    borderColorStrong: "#D9CFB8",
    dividerColor: "#EDE7DE",
    shadowColor: "#1A1815",
    shadowColorLight: "#9B9087",
  },
  dark: {
    bgPrimary: "#0F0D0B",
    bgSecondary: "#1A1815",
    bgTertiary: "#2A2620",
    bgQuaternary: "#352F29",
    textPrimary: "#F7F3ED",
    textSecondary: "#D9CFB8",
    textTertiary: "#9B9087",
    textInverse: "#1A1815",
    accentPrimary: "#D9894F",
    accentPrimaryLight: "#E8A86A",
    accentSecondary: "#E07856",
    accentTertiary: "#A87560",
    success: "#4CAF50",
    warning: "#FFB74D",
    error: "#EF5350",
    info: "#64B5F6",
    borderColor: "#352F29",
    borderColorStrong: "#4A4238",
    dividerColor: "#2A2620",
    shadowColor: "#000000",
    shadowColorLight: "#4A4238",
  },
};
export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? COLORS.dark : COLORS.light;
};
export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? COLORS.dark : COLORS.light;
  return {
    colors,
    isDark,
    isLight: !isDark,
    colorScheme: colorScheme || "light",
  };
};
export const withOpacity = (color: string, opacity: number): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
