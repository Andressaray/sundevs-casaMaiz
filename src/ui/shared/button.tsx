import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { useThemeColors } from "@/theme/ThemeContext";
import { getRadius, SPACING, TYPOGRAPHY } from "@/theme/styles";

export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  testID,
}) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const isDisabled = disabled || loading;

  const backgroundColor =
    variant === "primary" ? colors.accentPrimary : colors.bgTertiary;
  const textColor =
    variant === "primary" ? colors.textInverse : colors.textPrimary;

  const resolveOpacity = (pressed: boolean): number => {
    if (isDisabled) {
      return 0.5;
    }
    return pressed ? 0.85 : 1;
  };

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        {
          borderRadius: radius,
          backgroundColor,
          opacity: resolveOpacity(pressed),
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          testID={testID ? `${testID}-loading` : undefined}
          color={textColor}
        />
      ) : (
        <Text style={[styles.label, TYPOGRAPHY.h4, { color: textColor }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
  },
});

export default Button;
