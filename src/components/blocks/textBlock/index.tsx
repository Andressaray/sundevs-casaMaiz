import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useThemeColors } from "@/theme/colors";
import { getSpacing, SPACING, TYPOGRAPHY } from "@/theme/styles";
import type { TextBlock as TextBlockType } from "@/types/page.types";

interface TextBlockProps {
  block: TextBlockType;
}

const TextBlock: React.FC<TextBlockProps> = ({ block }) => {
  const colors = useThemeColors();
  const spacing = getSpacing();
  const { eyebrow, alignment, heading, body } = block;
  return (
    <View
      style={[
        styles.container,
        { paddingVertical: spacing * 3, paddingHorizontal: SPACING.xl },
      ]}
    >
      {eyebrow && (
        <Text
          style={[
            styles.eyebrow,
            TYPOGRAPHY.eyebrow,
            { color: colors.accentPrimary, textAlign: alignment },
          ]}
        >
          {eyebrow}
        </Text>
      )}
      <Text
        style={[
          styles.heading,
          TYPOGRAPHY.h1,
          { color: colors.textPrimary, textAlign: alignment },
        ]}
      >
        {heading}
      </Text>
      <Text
        style={[
          styles.body,
          TYPOGRAPHY.body,
          { color: colors.textSecondary, textAlign: alignment },
        ]}
      >
        {body}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
  },
  eyebrow: {
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
  },
  heading: {
    marginBottom: SPACING.lg,
    maxWidth: 400,
  },
  body: {
    maxWidth: 320,
    lineHeight: 26,
  },
});

export default TextBlock;
