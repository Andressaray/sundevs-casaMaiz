import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useThemeColors } from '../../theme/colors';
import { SPACING, TYPOGRAPHY, getRadius, getSpacing } from '../../theme/styles';

interface RestaurantCTAProps {
  eyebrow: string;
  headline: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
}

const RestaurantCTA: React.FC<RestaurantCTAProps> = ({ 
  eyebrow, 
  headline, 
  description, 
  buttonLabel, 
  onPress 
}) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: spacing * 3,
          paddingHorizontal: SPACING.xl,
          backgroundColor: colors.accentTertiary,
        }
      ]}
    >
      <View style={styles.decorLine} />
      
      <View style={styles.content}>
        <Text style={[styles.eyebrow, TYPOGRAPHY.eyebrow]}>
          {eyebrow}
        </Text>
        <Text style={[styles.headline, TYPOGRAPHY.h1, { color: 'white' }]}>
          {headline}
        </Text>
        <Text style={[styles.description, TYPOGRAPHY.body, { color: 'rgba(255,255,255,0.95)' }]}>
          {description}
        </Text>
      </View>

      <View style={styles.decorLine} />

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          {
            borderRadius: radius,
            backgroundColor: colors.bgSecondary,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: colors.accentTertiary }]}>
          {buttonLabel}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  decorLine: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
  },
  content: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  eyebrow: {
    color: 'white',
    opacity: 0.95,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '700',
    fontSize: 12,
  },
  headline: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    marginTop: SPACING.sm,
  },
  button: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default RestaurantCTA;
