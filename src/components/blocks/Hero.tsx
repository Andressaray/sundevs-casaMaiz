import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native';
import { useThemeColors } from '../../theme/colors';
import { SPACING, TYPOGRAPHY, getRadius, getSpacing } from '../../theme/styles';

interface Action {
  label: string;
  destination?: {
    path: string;
  };
  href?: string;
}

interface HeroProps {
  eyebrow: string;
  headline: string;
  description?: string;
  image?: any;
  actions?: Array<{
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
  }> | Action[];
}

const Hero: React.FC<HeroProps> = ({ eyebrow, headline, description, image, actions }) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();

  const normalizedActions = actions?.map((action: any) => ({
    label: action.label,
    onPress: action.onPress || (() => {}),
    variant: action.variant || 'primary'
  })) || [];

  return (
    <View style={[styles.container, { paddingVertical: spacing * 2, paddingHorizontal: SPACING.xl }]}>
      {image?.url && (
        <Image
          source={{ uri: image.url }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      )}
      
      {/* Overlay degradado para mejor legibilidad y efecto restaurante */}
      <View style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'rgba(139, 111, 71, 0.75)',
        }
      ]} />

      <View style={[styles.content, { zIndex: 1 }]}>
        <Text style={[styles.eyebrow, TYPOGRAPHY.eyebrow]}>
          {eyebrow}
        </Text>
        <Text style={[styles.headline, TYPOGRAPHY.h1]}>
          {headline}
        </Text>
        {description && (
          <Text style={[styles.description, TYPOGRAPHY.body]}>
            {description}
          </Text>
        )}
      </View>

      {normalizedActions && normalizedActions.length > 0 && (
        <View style={[styles.actions, { zIndex: 1 }]}>
          {normalizedActions.map((action, index) => (
            <Pressable
              key={index}
              onPress={action.onPress}
              style={({ pressed }) => [
                styles.button,
                action.variant === 'secondary' ? styles.secondaryButton : styles.primaryButton,
                { borderRadius: radius },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.buttonText, action.variant === 'secondary' && styles.secondaryButtonText]}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    minHeight: 340,
    gap: SPACING.lg,
    backgroundColor: '#8B6F47',
    overflow: 'hidden',
  },
  content: {
    gap: SPACING.md,
  },
  eyebrow: {
    color: 'white',
    opacity: 0.95,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
    fontSize: 12,
  },
  headline: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 44,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 24,
    fontSize: 16,
    marginTop: SPACING.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#D4A574',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: '#5C4A35',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: 'white',
  },
  pressed: {
    opacity: 0.8,
  },
});

export default Hero;
