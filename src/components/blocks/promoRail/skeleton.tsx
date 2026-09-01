import React from "react";
import { StyleSheet, View } from "react-native";

import { useThemeColors } from "@/theme/colors";
import { getRadius, getSpacing, SPACING } from "@/theme/styles";
import Skeleton from "@/ui/shared/skeleton";

interface PromoRailSkeletonProps {
  promoCount?: number;
}
const PromoRailSkeleton: React.FC<PromoRailSkeletonProps> = ({
  promoCount = 2,
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
      {}
      <Skeleton
        width="70%"
        height={32}
        borderRadius={4}
        style={{ marginBottom: spacing }}
      />
      {}
      <View style={styles.promos}>
        {Array(promoCount)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={[
                styles.promoCard,
                {
                  borderRadius: radius,
                  backgroundColor: colors.accentSecondary,
                },
              ]}
            >
              <View style={styles.promoLayout}>
                {}
                <View
                  style={[
                    styles.promoContent,
                    {
                      paddingHorizontal: SPACING.lg,
                      paddingVertical: SPACING.lg,
                    },
                  ]}
                >
                  {}
                  <Skeleton
                    width={90}
                    height={11}
                    borderRadius={4}
                    style={{ marginBottom: SPACING.sm }}
                  />
                  {}
                  <Skeleton
                    width="85%"
                    height={24}
                    borderRadius={4}
                    style={{ marginBottom: SPACING.md }}
                  />
                  {}
                  <Skeleton
                    width="100%"
                    height={15}
                    borderRadius={4}
                    style={{ marginBottom: SPACING.xs }}
                  />
                  <Skeleton
                    width="90%"
                    height={15}
                    borderRadius={4}
                    style={{ marginBottom: spacing }}
                  />
                  {}
                  <Skeleton width={100} height={32} borderRadius={radius / 2} />
                </View>
                {}
                <Skeleton
                  width={140}
                  height="100%"
                  borderRadius={0}
                  style={styles.promoImage}
                />
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
  promos: {
    gap: SPACING.lg,
  },
  promoCard: {
    overflow: "hidden",
    minHeight: 200,
    elevation: 6,
  },
  promoLayout: {
    flexDirection: "row",
    flex: 1,
  },
  promoContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  promoImage: {
    width: 140,
  },
});
export default PromoRailSkeleton;
