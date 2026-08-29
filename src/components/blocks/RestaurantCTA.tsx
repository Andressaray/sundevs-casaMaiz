import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { SPACING, TYPOGRAPHY, getShadow, getRadius, getSpacing } from '../../theme/styles';

interface RestaurantCTAProps {
  eyebrow: string;
  headline: string;
  description: string;
  buttonLabel: string;
  onPress: () => void;
}

const RestaurantCTA: React.FC<RestaurantCTAProps> = ({ eyebrow, headline, description, buttonLabel, onPress }) => {
  const radius = getRadius();
  const spacing = getSpacing();

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: spacing * 3,
          paddingHorizontal: SPACING.xl,
          backgroundColor: '#A85C2C',
        }
      ]}
    >
      <View style={styles.decorLine} />
      
      <View style={styles.content}>
        <Text style={[styles.eyebrow, TYPOGRAPHY.eyebrow, styles.eyebrowText]}>
          {eyebrow}
        </Text>
        <Text style={[styles.headline, TYPOGRAPHY.h1]}>
          {headline}
        </Text>
        <Text style={[styles.description, TYPOGRAPHY.body]}>
          {description}
        </Text>
      </View>

      <View style={styles.decorLine} />

      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          { borderRadius: radius },
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>{buttonLabel}</Text>
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
  eyebrowText: {},
  headline: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  description: {
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 16,
    marginTop: SPACING.sm,
  },
  button: {
    backgroundColor: '#F5E6D3',
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
    color: '#A85C2C',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});

export default RestaurantCTA;
