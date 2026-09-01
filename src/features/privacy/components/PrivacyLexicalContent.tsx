import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useThemeColors } from "@/theme/colors";
import { SPACING, TYPOGRAPHY } from "@/theme/styles";

import {
  LegalDocumentContent,
  LexicalChild,
  LexicalNode,
} from "../types/privacy.types";

interface PrivacyLexicalContentProps {
  content?: LegalDocumentContent;
}

type FormatMask = number;

const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_STRIKETHROUGH = 4;
const FORMAT_UNDERLINE = 8;

const parseFormat = (format?: string): FormatMask => {
  const parsed = parseInt(format ?? "0", 10);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getTextStyle = (
  colors: ReturnType<typeof useThemeColors>,
  format?: string,
) => {
  const mask = parseFormat(format);

  return [
    TYPOGRAPHY.body,
    { color: colors.textPrimary },
    mask & FORMAT_BOLD ? styles.bold : null,
    mask & FORMAT_ITALIC ? styles.italic : null,
    mask & FORMAT_UNDERLINE ? styles.underline : null,
    mask & FORMAT_STRIKETHROUGH ? styles.strikethrough : null,
  ];
};

const renderInline = (
  node: LexicalChild,
  key: string,
  colors: ReturnType<typeof useThemeColors>,
): React.ReactNode => {
  if (node.type === "linebreak") {
    return <Text key={key}>{"\n"}</Text>;
  }

  if (typeof node.text === "string") {
    return (
      <Text key={key} style={getTextStyle(colors, node.format)}>
        {node.text}
      </Text>
    );
  }

  if (node.children?.length) {
    return (
      <Text key={key}>
        {node.children.map((child, index) =>
          renderInline(child, `${key}-${index}`, colors),
        )}
      </Text>
    );
  }

  return null;
};

const renderBlock = (
  node: LexicalChild,
  key: string,
  colors: ReturnType<typeof useThemeColors>,
): React.ReactNode => {
  const children = node.children ?? [];

  switch (node.type) {
    case "heading":
      return (
        <Text
          key={key}
          style={[TYPOGRAPHY.h4, styles.heading, { color: colors.textPrimary }]}
        >
          {children.map((child, index) =>
            renderInline(child, `${key}-${index}`, colors),
          )}
        </Text>
      );
    case "paragraph":
      return (
        <Text
          key={key}
          style={[
            TYPOGRAPHY.body,
            styles.paragraph,
            { color: colors.textPrimary },
          ]}
        >
          {children.length
            ? children.map((child, index) =>
                renderInline(child, `${key}-${index}`, colors),
              )
            : " "}
        </Text>
      );
    case "list":
      return (
        <View key={key} style={styles.list}>
          {children.map((child, index) =>
            renderBlock(child, `${key}-${index}`, colors),
          )}
        </View>
      );
    case "listitem":
      return (
        <View key={key} style={styles.listItem}>
          <Text style={[TYPOGRAPHY.body, { color: colors.textPrimary }]}>
            {"•  "}
          </Text>
          <Text
            style={[
              TYPOGRAPHY.body,
              styles.listItemText,
              { color: colors.textPrimary },
            ]}
          >
            {children.map((child, index) =>
              renderInline(child, `${key}-${index}`, colors),
            )}
          </Text>
        </View>
      );
    case "quote":
      return (
        <View
          key={key}
          style={[styles.quote, { borderColor: colors.borderColorStrong }]}
        >
          <Text
            style={[
              TYPOGRAPHY.body,
              styles.quoteText,
              { color: colors.textSecondary },
            ]}
          >
            {children.map((child, index) =>
              renderInline(child, `${key}-${index}`, colors),
            )}
          </Text>
        </View>
      );
    default:
      if (!children.length) {
        return null;
      }
      return (
        <View key={key}>
          {children.map((child, index) =>
            renderBlock(child, `${key}-${index}`, colors),
          )}
        </View>
      );
  }
};

const PrivacyLexicalContent: React.FC<PrivacyLexicalContentProps> = ({
  content,
}) => {
  const colors = useThemeColors();
  const root: LexicalNode | undefined = content?.root;

  if (!root?.children?.length) {
    return null;
  }

  return (
    <View>
      {root.children.map((child, index) =>
        renderBlock(child, `block-${index}`, colors),
      )}
    </View>
  );
};

export default PrivacyLexicalContent;

const styles = StyleSheet.create({
  heading: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  paragraph: {
    marginBottom: SPACING.md,
  },
  list: {
    marginBottom: SPACING.md,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
  listItemText: {
    flex: 1,
  },
  quote: {
    borderLeftWidth: 3,
    paddingLeft: SPACING.md,
    marginBottom: SPACING.md,
  },
  quoteText: {
    fontStyle: "italic",
  },
  bold: {
    fontWeight: "700",
  },
  italic: {
    fontStyle: "italic",
  },
  underline: {
    textDecorationLine: "underline",
  },
  strikethrough: {
    textDecorationLine: "line-through",
  },
});
