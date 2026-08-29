import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useThemeColors } from '../../theme/colors';
import { SPACING, TYPOGRAPHY, getShadow, getRadius, getSpacing } from '../../theme/styles';

interface Promotion {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  cta: {
    label: string;
    onPress: () => void;
  };
  desktopImage?: { url?: string };
  mobileImage?: { url?: string };
  emoji?: string;
}

interface PromoRailProps {
  title: string;
  promotions: Promotion[];
}

const PromoRail: React.FC<PromoRailProps> = ({ title, promotions }) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();

  return (
    <View style={[styles.container, { paddingHorizontal: SPACING.xl, paddingVertical: spacing * 2 }]}>
      <Text style={[styles.title, TYPOGRAPHY.h2, { color: colors.textPrimary, marginBottom: spacing }]}>
        {title}
      </Text>

      <View style={styles.promos}>
        {promotions.map((promo) => (
          <View
            key={promo.id}
            style={[
              styles.promoCard,
              {
                borderRadius: radius,
                backgroundColor: colors.accentSecondary,
                shadowColor: colors.shadowColor,
                shadowOpacity: 0.15,
                shadowRadius: 6,
              },
            ]}
          >
            <View style={styles.promoLayout}>
              <View style={[styles.promoContent, { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.lg }]}>
                <Text style={[styles.promoEyebrow, TYPOGRAPHY.eyebrow, { color: 'white' }]}>
                  {promo.eyebrow}
                </Text>
                <Text style={[styles.promoTitle, { color: 'white', fontSize: 24, fontWeight: '700', marginVertical: SPACING.md }]}>
                  {promo.title}
                </Text>
                <Text style={[styles.promoDescription, TYPOGRAPHY.caption, { color: 'rgba(255,255,255,0.95)', marginBottom: spacing }]}>
                  {promo.description}
                </Text>
                <Pressable
                  onPress={promo.cta.onPress}
                  style={({ pressed }) => [
                    styles.promoButton,
                    { borderRadius: radius / 2, opacity: pressed ? 0.85 : 1 },
                  ]}
                >
                  <Text style={[styles.promoButtonText, { color: colors.accentSecondary }]}>
                    {promo.cta.label}
                  </Text>
                </Pressable>
              </View>

              <View style={[styles.promoImage, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                {promo.emoji ? (
                  <Text style={styles.emoji}>{promo.emoji}</Text>
                ) : promo.mobileImage?.url ? (
                  <Image source={{ uri: promo.mobileImage.url }} style={styles.image} />
                ) : null}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
  },
  title: {
    marginBottom: SPACING.lg,
  },
  promos: {
    gap: SPACING.lg,
  },
  promoCard: {
    overflow: 'hidden',
    minHeight: 200,
    elevation: 6,
  },
  promoLayout: {
    flexDirection: 'row',
    flex: 1,
  },
  promoContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  promoEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    opacity: 0.95,
    fontWeight: '700',
    fontSize: 11,
  },
  promoTitle: {
    lineHeight: 32,
  },
  promoDescription: {
    lineHeight: 20,
    fontSize: 15,
  },
  promoButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5E6D3',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  promoImage: {
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emoji: {
    fontSize: 72,
  },
});

export default PromoRail;
