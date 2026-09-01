import React from "react";
import { StyleSheet, Text, View } from "react-native";

import useTranslation from "@/hooks/useTranslations";
import { useThemeColors } from "@/theme/colors";
import { SPACING, TYPOGRAPHY } from "@/theme/styles";

import { LegalDocumentData } from "../types/privacy.types";
import PrivacyLexicalContent from "./PrivacyLexicalContent";

interface PrivacyContentProps {
  document: LegalDocumentData;
}

const formatDate = (value: string, locale: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const PrivacyContent: React.FC<PrivacyContentProps> = ({ document }) => {
  const { t, language } = useTranslation();
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[TYPOGRAPHY.h2, { color: colors.textPrimary }]}>
        {document.title}
      </Text>

      {!!document.summary && (
        <Text
          style={[
            TYPOGRAPHY.body,
            styles.summary,
            { color: colors.textSecondary },
          ]}
        >
          {document.summary}
        </Text>
      )}

      <View style={styles.metaRow}>
        {!!document.legalVersion && (
          <View
            style={[
              styles.metaBadge,
              {
                backgroundColor: colors.bgTertiary,
                borderColor: colors.borderColor,
              },
            ]}
          >
            <Text style={[TYPOGRAPHY.caption, { color: colors.textTertiary }]}>
              {t("privacy.labels.version")}
            </Text>
            <Text
              style={[
                TYPOGRAPHY.caption,
                styles.metaValue,
                { color: colors.textPrimary },
              ]}
            >
              {document.legalVersion}
            </Text>
          </View>
        )}

        {!!document.effectiveAt && (
          <View
            style={[
              styles.metaBadge,
              {
                backgroundColor: colors.bgTertiary,
                borderColor: colors.borderColor,
              },
            ]}
          >
            <Text style={[TYPOGRAPHY.caption, { color: colors.textTertiary }]}>
              {t("privacy.labels.effective_date")}
            </Text>
            <Text
              style={[
                TYPOGRAPHY.caption,
                styles.metaValue,
                { color: colors.textPrimary },
              ]}
            >
              {formatDate(document.effectiveAt, language)}
            </Text>
          </View>
        )}
      </View>

      <View
        style={[styles.divider, { backgroundColor: colors.dividerColor }]}
      />

      <PrivacyLexicalContent content={document.content} />
    </View>
  );
};

export default PrivacyContent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  summary: {
    marginTop: SPACING.sm,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  metaBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
  },
  metaValue: {
    fontWeight: "700",
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: SPACING.lg,
  },
});
