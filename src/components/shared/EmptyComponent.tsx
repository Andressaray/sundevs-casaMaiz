import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/theme/colors";
import { SPACING, TYPOGRAPHY } from "@/theme/styles";

export interface EmptyComponentProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  showBorder?: boolean;
  variant?: "default" | "compact";
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  showBorder,
  variant = "default",
}) => {
  const { colors, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.xxl,
      backgroundColor: colors.bgPrimary,
      borderRadius: 12,
      borderWidth: showBorder ? 1 : 0,
      borderColor: colors.borderColor,
    },
    compactContainer: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.xl,
    },
    iconContainer: {
      marginBottom: SPACING.lg,
      padding: SPACING.lg,
      backgroundColor: isDark ? colors.bgTertiary : colors.bgSecondary,
      borderRadius: 50,
      width: 80,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fontSize: 40,
    },
    titleText: {
      ...TYPOGRAPHY.h3,
      color: colors.textPrimary,
      marginBottom: SPACING.md,
      textAlign: "center",
    },
    descriptionText: {
      ...TYPOGRAPHY.body,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: SPACING.lg,
      lineHeight: 22,
    },
    actionButton: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.md,
      backgroundColor: colors.accentPrimary,
      borderRadius: 8,
      marginTop: SPACING.md,
    },
    actionButtonText: {
      ...TYPOGRAPHY.h4,
      color: colors.textInverse,
      textAlign: "center",
    },
    actionButtonPressed: {
      opacity: 0.8,
    },
  });

  const containerStyle = [
    styles.container,
    variant === "compact" && styles.compactContainer,
  ];

  return (
    <View
      testID="empty-component"
      style={containerStyle}
      accessibilityRole="text"
    >
      {icon ? (
        <View testID="empty-component-icon" style={styles.iconContainer}>
          {typeof icon === "string" ? (
            <Text style={styles.icon}>{icon}</Text>
          ) : (
            icon
          )}
        </View>
      ) : null}

      <Text testID="empty-component-title" style={styles.titleText}>
        {title}
      </Text>

      {description ? (
        <Text
          testID="empty-component-description"
          style={styles.descriptionText}
        >
          {description}
        </Text>
      ) : null}

      {actionLabel && onAction ? (
        <Pressable
          testID="empty-component-action"
          onPress={onAction}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={styles.actionButtonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default EmptyComponent;
