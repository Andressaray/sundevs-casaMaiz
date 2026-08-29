import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Image } from 'react-native';
import { useThemeColors } from '../../theme/colors';
import { SPACING, TYPOGRAPHY, getShadow, getRadius, getSpacing } from '../../theme/styles';

interface CarouselSlide {
  id: string;
  title: string;
  description: string;
  image?: { url?: string };
  emoji?: string;
}

interface CarouselProps {
  title: string;
  slides: CarouselSlide[];
}

const Carousel: React.FC<CarouselProps> = ({ title, slides }) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const spacing = getSpacing();

  return (
    <View style={[styles.container, { paddingHorizontal: SPACING.xl, paddingVertical: spacing * 2 }]}>
      <Text style={[styles.title, TYPOGRAPHY.h2, { color: colors.textPrimary, marginBottom: spacing }]}>
        {title}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={300}
        decelerationRate="fast"
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={[
              styles.slide,
              {
                backgroundColor: colors.bgSecondary,
                borderRadius: radius,
                ...getShadow(),
              },
            ]}
          >
            <View style={[styles.slideImage, { backgroundColor: colors.bgTertiary }]}>
              {slide.image?.url ? (
                <Image source={{ uri: slide.image.url }} style={styles.image} />
              ) : slide.emoji ? (
                <Text style={styles.emoji}>{slide.emoji}</Text>
              ) : null}
            </View>

            <View style={[styles.slideContent, { paddingHorizontal: SPACING.md, paddingVertical: SPACING.md }]}>
              <Text style={[styles.slideTitle, TYPOGRAPHY.h4, { color: colors.textPrimary }]}>
                {slide.title}
              </Text>
              <Text style={[styles.slideDescription, TYPOGRAPHY.caption, { color: colors.textSecondary }]}>
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    overflow: 'hidden',
  },
  slideImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
