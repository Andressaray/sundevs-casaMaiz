import React from "react";
import { StyleSheet, View } from "react-native";

import { SPACING } from "@/theme/styles";
import Container from "@/ui/shared/container";
import Skeleton from "@/ui/shared/skeleton";

const PrivacySkeleton = (): React.ReactElement => {
  return (
    <Container>
      <View style={styles.container}>
        <Skeleton
          width="70%"
          height={30}
          borderRadius={4}
          style={styles.title}
        />

        <Skeleton
          width="100%"
          height={16}
          borderRadius={4}
          style={styles.line}
        />
        <Skeleton
          width="90%"
          height={16}
          borderRadius={4}
          style={styles.line}
        />

        <View style={styles.metaRow}>
          <Skeleton width={110} height={44} borderRadius={8} />
          <Skeleton width={140} height={44} borderRadius={8} />
        </View>

        <Skeleton
          width="100%"
          height={1}
          borderRadius={0}
          style={styles.divider}
        />

        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            width={index % 3 === 2 ? "60%" : "100%"}
            height={16}
            borderRadius={4}
            style={styles.line}
          />
        ))}
      </View>
    </Container>
  );
};

export default PrivacySkeleton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.lg,
  },
  line: {
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  divider: {
    marginBottom: SPACING.lg,
  },
});
