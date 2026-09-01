import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { FONTS } from "@/config/constants";
import { useThemeColors } from "@/theme/colors";
import { getRadius, getSpacing, SPACING, TYPOGRAPHY } from "@/theme/styles";
import { CardGridBlock } from "@/types/page.types";

interface CardGridProps {
  block: CardGridBlock;
}

const CardGrid: React.FC<CardGridProps> = ({ block }) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();

  const { cards, eyebrow, title } = block;

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: SPACING.xl, paddingVertical: spacing * 2 },
      ]}
    >
      <Text
        style={[
          styles.eyebrow,
          TYPOGRAPHY.eyebrow,
          { color: colors.accentPrimary },
        ]}
      >
        {eyebrow}
      </Text>
      <Text
        style={[
          styles.title,
          TYPOGRAPHY.h2,
          { color: colors.textPrimary, marginBottom: spacing * 1.5 },
        ]}
      >
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
                shadowColor: colors.shadowColor,
                shadowOpacity: 0.12,
                shadowRadius: 4,
              },
            ]}
          >
            <View
              style={[styles.cardImage, { backgroundColor: colors.bgTertiary }]}
            >
              {card.image?.url ? (
                <Image source={{ uri: card.image.url }} style={styles.image} />
              ) : null}
            </View>

            <View
              style={[
                styles.cardContent,
                { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
              ]}
            >
              <Text
                style={[
                  styles.cardTitle,
                  TYPOGRAPHY.h4,
                  { color: colors.textPrimary },
                ]}
              >
                {card.title}
              </Text>
              <Text
                style={[
                  styles.cardDescription,
                  TYPOGRAPHY.caption,
                  { color: colors.textSecondary, marginVertical: SPACING.md },
                ]}
              >
                {card.description}
              </Text>
              <Text style={[styles.price, { color: colors.accentPrimary }]}>
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
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    marginBottom: SPACING.lg,
  },
  grid: {
    gap: SPACING.lg,
  },
  card: {
    overflow: "hidden",
    borderWidth: 1,
    elevation: 8,
  },
  cardImage: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    fontSize: 18,
    fontWeight: "600",
  },
  cardDescription: {
    lineHeight: 20,
    fontSize: 14,
  },
  price: {
    fontWeight: "700",
    fontSize: 24,
    marginTop: SPACING.sm,
    fontFamily: FONTS.regular,
  },
});

export default CardGrid;
