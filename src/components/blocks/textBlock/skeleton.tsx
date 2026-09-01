import React from "react";
import { StyleSheet, View } from "react-native";

import { getSpacing, SPACING } from "@/theme/styles";
import Skeleton from "@/ui/shared/skeleton";

interface TextBlockSkeletonProps {
  showEyebrow?: boolean;
}
export const TextBlockSkeleton: React.FC<TextBlockSkeletonProps> = ({
  showEyebrow = true,
}) => {
  const spacing = getSpacing();
  return (
    <View
      style={[
        styles.container,
        { paddingVertical: spacing * 3, paddingHorizontal: SPACING.xl },
      ]}
    >
      {showEyebrow && (
        <Skeleton
          width={100}
          height={12}
          borderRadius={4}
          style={{ marginBottom: SPACING.md }}
        />
      )}
      <Skeleton
        width="80%"
        height={36}
        borderRadius={4}
        style={{ marginBottom: SPACING.lg }}
      />
      <Skeleton
        width="100%"
        height={16}
        borderRadius={4}
        style={{ marginBottom: SPACING.xs }}
      />
      <Skeleton
        width="100%"
        height={16}
        borderRadius={4}
        style={{ marginBottom: SPACING.xs }}
      />
      <Skeleton width="70%" height={16} borderRadius={4} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TextBlockSkeleton;
