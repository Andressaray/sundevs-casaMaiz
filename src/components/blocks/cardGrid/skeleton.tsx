import React from "react";
import { StyleSheet, View } from "react-native";

import Skeleton from "@/ui/shared/skeleton";

import { useThemeColors } from "@/theme/colors";
import { getRadius, getSpacing, SPACING } from "@/theme/styles";

interface CardGridSkeletonProps {
  cardCount?: number;
}
const CardGridSkeleton: React.FC<CardGridSkeletonProps> = ({
  cardCount = 3,
}) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();
  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: SPACING.xl, paddingVertical: spacing * 2 },
      ]}
    >
      <Skeleton
        width={80}
        height={12}
        borderRadius={4}
        style={{ marginBottom: SPACING.xs }}
      />
      <Skeleton
        width="60%"
        height={32}
        borderRadius={4}
        style={{ marginBottom: spacing }}
      />
      <View style={styles.grid}>
        {Array(cardCount)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.card,
                {
                  backgroundColor: colors.bgSecondary,
                  borderRadius: radius,
                  borderColor: colors.borderColor,
                },
              ]}
            >
              <Skeleton
                width="100%"
                height={220}
                borderRadius={radius}
                style={styles.cardImage}
              />
              <View
                style={[
                  styles.cardContent,
                  {
                    paddingHorizontal: SPACING.md,
                    paddingVertical: SPACING.md,
                  },
                ]}
              >
                <Skeleton
                  width="80%"
                  height={18}
                  borderRadius={4}
                  style={{ marginBottom: SPACING.sm }}
                />
                <Skeleton
                  width="100%"
                  height={14}
                  borderRadius={4}
                  style={{ marginBottom: SPACING.xs }}
                />
                <Skeleton
                  width="90%"
                  height={14}
                  borderRadius={4}
                  style={{ marginBottom: SPACING.md }}
                />
                <Skeleton width="50%" height={24} borderRadius={4} />
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
  },
  cardContent: {
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
});
export default CardGridSkeleton;
