import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { useThemeColors } from "@/theme/ThemeContext";
import { getRadius, SPACING, TYPOGRAPHY } from "@/theme/styles";

export interface InputProps extends Omit<
  TextInputProps,
  "style" | "onChangeText" | "value"
> {
  label: string;
  value: string;
  onChangeText: (_value: string) => void;
  errorMessage?: string;
  testID?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  errorMessage,
  testID,
  ...textInputProps
}) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const hasError = !!errorMessage;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          TYPOGRAPHY.caption,
          { color: colors.textSecondary },
        ]}
      >
        {label}
      </Text>
      <TextInput
        testID={testID}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textTertiary}
        accessibilityLabel={label}
        style={[
          styles.input,
          TYPOGRAPHY.body,
          {
            borderRadius: radius,
            borderColor: hasError ? colors.error : colors.borderColor,
            backgroundColor: colors.bgSecondary,
            color: colors.textPrimary,
          },
        ]}
        {...textInputProps}
      />
      {hasError ? (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          style={[styles.error, TYPOGRAPHY.caption, { color: colors.error }]}
        >
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
    width: "100%",
  },
  label: {
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  error: {
    marginTop: SPACING.xs,
  },
});

export default Input;
