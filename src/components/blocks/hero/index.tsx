import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { getRadius, getSpacing, SPACING, TYPOGRAPHY } from "@/theme/styles";
import { RestaurantHeroBlock } from "@/types/page.types";

interface HeroProps {
  block: RestaurantHeroBlock;
  onPress: (_v: string) => void;
}
const Hero: React.FC<HeroProps> = ({ block, onPress }) => {
  const { actions, image, description, eyebrow, headline } = block;
  const radius = getRadius();
  const spacing = getSpacing();
  return (
    <View
      style={[
        styles.container,
        { paddingVertical: spacing * 2, paddingHorizontal: SPACING.xl },
      ]}
    >
      {image?.url && (
        <Image
          source={{ uri: image.url, cache: "force-cache" }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      )}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(139, 111, 71, 0.75)" },
        ]}
      />
      <View style={[styles.content, { zIndex: 1 }]}>
        {eyebrow && (
          <Text style={[styles.eyebrow, TYPOGRAPHY.eyebrow]}>{eyebrow}</Text>
        )}
        <Text style={[styles.headline, TYPOGRAPHY.h1]}>{headline}</Text>
        {description && (
          <Text style={[styles.description, TYPOGRAPHY.body]}>
            {description}
          </Text>
        )}
      </View>
      {actions && actions.length > 0 && (
        <View style={[styles.actions, { zIndex: 1 }]}>
          {actions.map((action, index) => (
            <Pressable
              key={index}
              onPress={() => {
                onPress(action.href);
              }}
              style={({ pressed }) => [
                styles.button,
                styles.primaryButton,
                {
                  borderRadius: radius,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
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
    justifyContent: "flex-end",
    minHeight: 340,
    gap: SPACING.lg,
    backgroundColor: "#8B6F47",
    overflow: "hidden",
  },
  content: {
    gap: SPACING.md,
  },
  eyebrow: {
    color: "white",
    opacity: 0.95,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: "700",
    fontSize: 12,
  },
  headline: {
    color: "white",
    fontSize: 36,
    fontWeight: "700",
    lineHeight: 44,
  },
  description: {
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 24,
    fontSize: 16,
    marginTop: SPACING.sm,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#D4A574",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#3D3530",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: "white",
  },
  pressed: {
    opacity: 0.8,
  },
});
export default Hero;
