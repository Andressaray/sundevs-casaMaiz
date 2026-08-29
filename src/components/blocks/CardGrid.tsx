import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Image } from 'react-native';
import { useThemeColors } from '../../theme/colors';
import { SPACING, TYPOGRAPHY, getShadow, getRadius, getSpacing } from '../../theme/styles';

interface Card {
  id: string;
  title: string;
  description: string;
  price: string;
  image?: { url?: string };
  emoji?: string;
}

interface CardGridProps {
  eyebrow: string;
  title: string;
  cards: Card[];
}

const CardGrid: React.FC<CardGridProps> = ({ eyebrow, title, cards }) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();

  return (
    <View style={[styles.container, { paddingHorizontal: SPACING.xl, paddingVertical: spacing * 2 }]}>
      <Text style={[styles.eyebrow, TYPOGRAPHY.eyebrow, { color: colors.accentPrimary }]}>
        {eyebrow}
      </Text>
      <Text style={[styles.title, TYPOGRAPHY.h2, { color: colors.textPrimary, marginBottom: spacing * 1.5 }]}>
        {title}
      </Text>

      <View style={styles.grid}>
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.bgSecondary,
                borderRadius: radius,
                borderColor: colors.borderColor,
                ...getShadow(),
              },
            ]}
          >
            <View style={[styles.cardImage, { backgroundColor: colors.bgTertiary }]}>
              {card.image?.url ? (
                <Image source={{ uri: card.image.url }} style={styles.image} />
              ) : card.emoji ? (
                <Text style={styles.emoji}>{card.emoji}</Text>
              ) : null}
            </View>

            <View style={[styles.cardContent, { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md }]}>
              <Text style={[styles.cardTitle, TYPOGRAPHY.h4, { color: colors.textPrimary }]}>
                {card.title}
              </Text>
              <Text style={[styles.cardDescription, TYPOGRAPHY.caption, { color: colors.textSecondary, marginVertical: SPACING.md }]}>
                {card.description}
              </Text>
              <Text style={[styles.price, { color: colors.accentPrimary, fontSize: 20, fontWeight: '600' }]}>
                {card.price}
              </Text>
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
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    marginBottom: SPACING.lg,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  grid: {
    gap: SPACING.lg,
  },
  card: {
    overflow: 'hidden',
    borderWidth: 0,
    elevation: 8,
    shadowColor: '#8B6F47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E6D3',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emoji: {
    fontSize: 64,
  },
  cardContent: {
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  cardTitle: {
    marginBottom: SPACING.xs,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 18,
    fontWeight: '600',
  },
  cardDescription: {
    lineHeight: 20,
    fontSize: 14,
  },
  price: {
    fontWeight: '700',
    fontSize: 24,
    marginTop: SPACING.sm,
  },
});

export default CardGrid;
