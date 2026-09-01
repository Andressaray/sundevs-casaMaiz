import { StyleSheet } from "react-native";

type ColorScheme = {
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  borderColor: string;
  [key: string]: string;
};

export const createNotFoundStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgPrimary,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    contentContainer: {
      alignItems: "center",
      gap: 24,
    },
    errorCode: {
      fontSize: 80,
      fontWeight: "700",
      color: colors.accentPrimary,
      lineHeight: 88,
    },
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: colors.textPrimary,
      textAlign: "center",
    },
    description: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
      lineHeight: 24,
      maxWidth: 300,
    },
    buttonContainer: {
      gap: 12,
      width: "100%",
      alignItems: "center",
    },
    primaryButton: {
      backgroundColor: colors.accentPrimary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      minWidth: 200,
      alignItems: "center",
    },
    primaryButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    secondaryButton: {
      backgroundColor: colors.bgSecondary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      minWidth: 200,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    secondaryButtonText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
  });
