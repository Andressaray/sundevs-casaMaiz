import { Platform } from "react-native";

import { FONTS } from "@/config/constants";

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const RADIUS = {
  ios: 16,
  android: 8,
  small: 6,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 36,
    fontWeight: "700" as const,
    lineHeight: 42,
    fontFamily: FONTS.regular,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 34,
    fontFamily: FONTS.regular,
  },
  h3: {
    fontSize: 22,
    fontWeight: "700" as const,
    lineHeight: 28,
    fontFamily: FONTS.regular,
  },
  h4: {
    fontSize: 18,
    fontWeight: "600" as const,
    lineHeight: 24,
    fontFamily: FONTS.regular,
  },
  body: {
    fontSize: 15,
    fontWeight: "400" as const,
    lineHeight: 22,
    fontFamily: FONTS.regular,
  },
  caption: {
    fontSize: 13,
    fontWeight: "500" as const,
    lineHeight: 18,
    fontFamily: FONTS.regular,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700" as const,
    lineHeight: 16,
    letterSpacing: 0.8,
    fontFamily: FONTS.regular,
  },
};

export const getShadow = (intensity: "light" | "medium" = "light") => {
  if (Platform.OS === "ios") {
    return {
      shadowColor: "#1A1815",
      shadowOffset:
        intensity === "light"
          ? { width: 0, height: 1 }
          : { width: 0, height: 2 },
      shadowOpacity: intensity === "light" ? 0.08 : 0.12,
      shadowRadius: intensity === "light" ? 3 : 4,
    };
  }
  return {
    elevation: intensity === "light" ? 2 : 4,
  };
};

export const getRadius = () => {
  return Platform.OS === "ios" ? RADIUS.ios : RADIUS.android;
};

export const getSpacing = (multiplier: number = 1) => {
  const baseSpacing = Platform.OS === "ios" ? 1.2 : 1;
  return Math.round(SPACING.lg * baseSpacing * multiplier);
};
