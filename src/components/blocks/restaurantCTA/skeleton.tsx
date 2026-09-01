import React from "react";
import { StyleSheet, View } from "react-native";

import { useThemeColors } from "@/theme/colors";
import { getRadius, getSpacing, SPACING } from "@/theme/styles";
import Skeleton from "@/ui/shared/skeleton";

export const RestaurantCTASkeleton: React.FC = () => {
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
        },
      ]}
    >
      {}
      <View style={styles.decorLine} />
      <View style={styles.content}>
        <Skeleton
          width={120}
          height={12}
          borderRadius={4}
          style={{ marginBottom: SPACING.sm }}
        />
        <Skeleton
          width="70%"
          height={36}
          borderRadius={4}
          style={{ marginBottom: SPACING.md }}
        />
        <Skeleton
          width="90%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: SPACING.xs }}
        />
        <Skeleton width="85%" height={16} borderRadius={4} />
      </View>
      <View style={styles.decorLine} />
      <Skeleton width="70%" height={48} borderRadius={radius} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.lg,
  },
  decorLine: {
    width: 40,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 1,
  },
  content: {
    alignItems: "center",
    gap: SPACING.md,
  },
});
export default RestaurantCTASkeleton;
