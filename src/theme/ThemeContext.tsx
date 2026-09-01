import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

import { COLORS } from "./colors";

export type ThemeMode = "light" | "dark" | "auto";
interface ThemeContextType {
  currentTheme: "light" | "dark";
  themeMode: ThemeMode;
  setThemeMode: (_mode: ThemeMode) => void;
  toggleTheme: () => void;
  colors: typeof COLORS.light;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const currentTheme = (() => {
    if (themeMode === "auto") {
      return systemColorScheme === "dark" ? "dark" : "light";
    }
    return themeMode;
  })();
  const colors = currentTheme === "dark" ? COLORS.dark : COLORS.light;
  const toggleTheme = () => {
    setThemeMode(currentTheme === "dark" ? "light" : "dark");
  };
  const value: ThemeContextType = {
    currentTheme,
    themeMode,
    setThemeMode,
    toggleTheme,
    colors,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme debe usarse dentro de ThemeProvider");
  }
  return context;
};
export const useThemeColors = () => {
  const { colors } = useAppTheme();
  return colors;
};
export const useDarkMode = (): boolean => {
  const { currentTheme } = useAppTheme();
  return currentTheme === "dark";
};
