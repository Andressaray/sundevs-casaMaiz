import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { useThemeColors } from "@/theme/colors";

import {
  getRadius,
  getShadow,
  getSpacing,
  SPACING,
  TYPOGRAPHY,
} from "@/theme/styles";
import { CarouselBlock } from "@/types/page.types";

interface CarouselProps {
  block: CarouselBlock;
}

const Carousel: React.FC<CarouselProps> = ({ block }) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();

  const { slides, title } = block;

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: SPACING.xl, paddingVertical: spacing * 2 },
      ]}
    >
      <Text
        style={[
          styles.title,
          TYPOGRAPHY.h2,
          { color: colors.textPrimary, marginBottom: spacing },
        ]}
      >
        {title}
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={300}
        decelerationRate="fast"
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        data={slides}
        renderItem={({ item }) => (
          <View
            style={[
              styles.slide,
              {
                backgroundColor: colors.bgSecondary,
                borderRadius: radius,
                ...getShadow(),
              },
            ]}
          >
            <View
              style={[
                styles.slideImage,
                { backgroundColor: colors.bgTertiary },
              ]}
            >
              {item.image?.url ? (
                <Image source={{ uri: item.image.url }} style={styles.image} />
              ) : null}
            </View>

            <View
              style={[
                styles.slideContent,
                { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md },
              ]}
            >
              <Text
                style={[
                  styles.slideTitle,
                  TYPOGRAPHY.h4,
                  { color: colors.textPrimary },
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={[
                  styles.slideDescription,
                  TYPOGRAPHY.caption,
                  { color: colors.textSecondary },
                ]}
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  scroll: {
    marginHorizontal: -SPACING.xl,
    paddingHorizontal: SPACING.xl,
  },
  scrollContent: {
    gap: SPACING.lg,
    paddingRight: SPACING.xl,
  },
  slide: {
    width: 280,
    overflow: "hidden",
  },
  slideImage: {
    width: "100%",
    height: 200,
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
  slideContent: {
    gap: SPACING.sm,
  },
  slideTitle: {
    marginBottom: SPACING.xs,
  },
  slideDescription: {
    lineHeight: 18,
  },
});

export default Carousel;
