import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { FONTS } from "@/config/constants";
import useTranslation from "@/hooks/useTranslations";

import { useThemeColors } from "../../theme/colors";
import { SPACING, TYPOGRAPHY } from "../../theme/styles";

export interface ErrorFallbackProps {
  error?: Error | string;
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  showDetails?: boolean;
  titleKey?: string;
  messageKey?: string;
  retryLabelKey?: string;
}

const resolveText = (
  literal: string | undefined,
  key: string,
  fallbackKey: string,
  translate: (_key: string) => string,
): string => literal || translate(key || fallbackKey);

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  title,
  message,
  onRetry,
  retryLabel,
  showDetails = false,
  titleKey = "",
  messageKey = "",
  retryLabelKey = "",
}) => {
  const colors = useThemeColors();
  const { t } = useTranslation();

  const errorMessage = typeof error === "string" ? error : error?.message;
  const displayTitle = resolveText(title, titleKey, "errors.general_error", t);
  const displayMessage = resolveText(
    message,
    messageKey,
    "errors.load_content_error",
    t,
  );
  const displayRetryLabel = resolveText(
    retryLabel,
    retryLabelKey,
    "common.retry",
    t,
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bgPrimary }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.content, { backgroundColor: colors.bgSecondary }]}>
        <View
          style={[
            styles.errorIcon,
            { backgroundColor: colors.accentSecondary + "20" },
          ]}
        >
          <Text style={styles.errorEmoji}>⚠️</Text>
        </View>
        <Text
          style={[styles.title, TYPOGRAPHY.h2, { color: colors.textPrimary }]}
        >
          {displayTitle}
        </Text>
        <Text
          style={[
            styles.message,
            TYPOGRAPHY.body,
            { color: colors.textSecondary },
          ]}
        >
          {displayMessage}
        </Text>
        {showDetails && errorMessage && (
          <View
            style={[
              styles.detailsBox,
              {
                backgroundColor: colors.bgTertiary,
                borderColor: colors.borderColor,
              },
            ]}
          >
            <Text style={[styles.detailsLabel, { color: colors.textTertiary }]}>
              {t("errors.details")}
            </Text>
            <Text style={[styles.detailsText, { color: colors.textSecondary }]}>
              {errorMessage}
            </Text>
          </View>
        )}
        {onRetry && (
          <Pressable
            onPress={onRetry}
            style={({ pressed }) => [
              styles.retryButton,
              {
                backgroundColor: colors.accentPrimary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text style={[styles.retryButtonText, { color: "white" }]}>
              {displayRetryLabel}
            </Text>
          </Pressable>
        )}
        <View style={styles.helpBox}>
          <Text style={[styles.helpTitle, { color: colors.textTertiary }]}>
            {t("errorFallback.suggestions_title")}
          </Text>
          <Text style={[styles.helpText, { color: colors.textTertiary }]}>
            {t("errorFallback.check_connection")}
          </Text>
          <Text style={[styles.helpText, { color: colors.textTertiary }]}>
            {t("errorFallback.retry_later")}
          </Text>
          <Text style={[styles.helpText, { color: colors.textTertiary }]}>
            {t("errorFallback.reload_app")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: SPACING.xl,
  },
  content: {
    marginHorizontal: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: 12,
    alignItems: "center",
    gap: SPACING.lg,
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  errorEmoji: {
    fontSize: 48,
  },
  title: {
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  message: {
    textAlign: "center",
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  detailsBox: {
    width: "100%",
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: SPACING.md,
  },
  detailsLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: SPACING.xs,
    fontFamily: FONTS.regular,
  },
  detailsText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONTS.regular,
  },
  retryButton: {
    width: "100%",
    paddingVertical: SPACING.md,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SPACING.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: FONTS.regular,
  },
  helpBox: {
    width: "100%",
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  helpTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: SPACING.sm,
    fontFamily: FONTS.regular,
  },
  helpText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: FONTS.regular,
  },
});
