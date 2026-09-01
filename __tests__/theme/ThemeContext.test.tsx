/* eslint-disable max-nested-callbacks */
import React from "react";
import { Text, useColorScheme } from "react-native";
import { act, render, renderHook, screen } from "@testing-library/react-native";
import {
  ThemeProvider,
  useAppTheme,
  useDarkMode,
  useThemeColors,
} from "@/theme/ThemeContext";
import { COLORS } from "@/theme/colors";

jest.mock("react-native/Libraries/Utilities/useColorScheme");

const mockedUseColorScheme = useColorScheme as jest.MockedFunction<
  typeof useColorScheme
>;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("theme / ThemeContext", () => {
  beforeEach(() => {
    mockedUseColorScheme.mockReturnValue("light");
  });

  it("useAppTheme lanza error fuera del provider", () => {
    expect(() => renderHook(() => useAppTheme())).toThrow(
      "useAppTheme debe usarse dentro de ThemeProvider",
    );
  });

  it("arranca en modo auto siguiendo al sistema", () => {
    const { result } = renderHook(() => useAppTheme(), { wrapper });

    expect(result.current.themeMode).toBe("auto");
    expect(result.current.currentTheme).toBe("light");
    expect(result.current.colors).toEqual(COLORS.light);
  });

  it("sigue al sistema cuando el sistema esta en dark", () => {
    mockedUseColorScheme.mockReturnValue("dark");

    const { result } = renderHook(() => useAppTheme(), { wrapper });

    expect(result.current.currentTheme).toBe("dark");
    expect(result.current.colors).toEqual(COLORS.dark);
  });

  it("setThemeMode fuerza el tema por encima del sistema", () => {
    mockedUseColorScheme.mockReturnValue("light");

    const { result } = renderHook(() => useAppTheme(), { wrapper });

    act(() => {
      result.current.setThemeMode("dark");
    });

    expect(result.current.themeMode).toBe("dark");
    expect(result.current.currentTheme).toBe("dark");
    expect(result.current.colors).toEqual(COLORS.dark);
  });

  it("toggleTheme alterna entre light y dark", () => {
    const { result } = renderHook(() => useAppTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.currentTheme).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.currentTheme).toBe("light");
  });

  it("useThemeColors devuelve la paleta del tema activo", () => {
    const Consumer = () => {
      const colors = useThemeColors();
      return <Text testID="bg">{colors.bgPrimary}</Text>;
    };

    render(<Consumer />, { wrapper });

    expect(screen.getByTestId("bg")).toHaveTextContent(COLORS.light.bgPrimary);
  });

  it("useDarkMode refleja el tema activo", () => {
    mockedUseColorScheme.mockReturnValue("dark");

    const { result } = renderHook(() => useDarkMode(), { wrapper });

    expect(result.current).toBe(true);
  });
});
