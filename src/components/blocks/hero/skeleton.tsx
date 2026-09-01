import React from "react";
import { StyleSheet, View } from "react-native";

import { getRadius, getSpacing, SPACING } from "@/theme/styles";
import Skeleton from "@/ui/shared/skeleton";

const HeroSkeleton: React.FC = () => {
  const radius = getRadius();
  const spacing = getSpacing();
  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: spacing * 2,
          paddingHorizontal: SPACING.xl,
          backgroundColor: "#8B6F47",
        },
      ]}
    >
      <View style={[styles.content, { zIndex: 1 }]}>
        <Skeleton
          width={100}
          height={12}
          borderRadius={4}
          style={{ marginBottom: SPACING.sm }}
        />
        <Skeleton
          width="90%"
          height={40}
          borderRadius={4}
          style={{ marginBottom: SPACING.md }}
        />
        <Skeleton
          width="100%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: SPACING.xs }}
        />
        <Skeleton
          width="85%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: SPACING.lg }}
        />
      </View>
      <View style={[styles.actions, { zIndex: 1 }]}>
        <Skeleton width="48%" height={48} borderRadius={radius} />
        <Skeleton width="48%" height={48} borderRadius={radius} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    minHeight: 340,
    gap: SPACING.lg,
    overflow: "hidden",
  },
  content: {
    gap: SPACING.md,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
  },
});
export default HeroSkeleton;
