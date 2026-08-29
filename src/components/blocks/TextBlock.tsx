import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../../theme/colors';
import { SPACING, TYPOGRAPHY, getSpacing } from '../../theme/styles';

interface TextBlockProps {
  eyebrow?: string;
  heading: string;
  body: string;
  alignment?: 'left' | 'center' | 'right';
}

const TextBlock: React.FC<TextBlockProps> = ({ eyebrow, heading, body, alignment = 'center' }) => {
  const colors = useThemeColors();
  const spacing = getSpacing();

  return (
    <View style={[styles.container, { paddingVertical: spacing * 3, paddingHorizontal: SPACING.xl }]}>
      {eyebrow && (
        <Text style={[styles.eyebrow, TYPOGRAPHY.eyebrow, { color: colors.accentPrimary, textAlign: alignment }]}>
          {eyebrow}
        </Text>
      )}
      <Text style={[styles.heading, TYPOGRAPHY.h1, { color: colors.textPrimary, textAlign: alignment }]}>
        {heading}
      </Text>
      <Text style={[styles.body, TYPOGRAPHY.body, { color: colors.textSecondary, textAlign: alignment }]}>
        {body}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyebrow: {
    textTransform: 'uppercase',
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
