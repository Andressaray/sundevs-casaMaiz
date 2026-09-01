import React from "react";

import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useThemeColors } from "@/theme/colors";
import { SPACING } from "@/theme/styles";
import type { ImageBlock as ImageBlockType } from "@/types/page.types";

interface ImageBlockProps {
  block: ImageBlockType;
}

const ImageBlock = ({ block }: ImageBlockProps) => {
  const colors = useThemeColors();
  const { width } = useWindowDimensions();
  const { mobileImage, image, fullBleed, caption } = block;
  const imageToShow = mobileImage || image;

  if (!imageToShow?.url) {
    return <View />;
  }

  const aspectRatio = imageToShow.width / imageToShow.height;
  const imageHeight = width / aspectRatio;
  return (
    <View
      style={[
        styles.container,
        fullBleed && styles.fullBleed,
        !fullBleed && {
          paddingHorizontal: SPACING.xl,
          paddingVertical: SPACING.xl,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageToShow.url }}
          style={[
            styles.image,
            {
              width: "100%",
              height: imageHeight,
            },
          ]}
          resizeMode="cover"
        />
      </View>

      {caption && (
        <Text
          style={[
            styles.caption,
            {
              color: colors.textSecondary,
              paddingHorizontal: fullBleed ? SPACING.xl : 0,
              marginTop: SPACING.md,
            },
          ]}
        >
          {caption}
        </Text>
      )}
    </View>
  );
};

export default ImageBlock;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  fullBleed: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
  },
  image: {
    resizeMode: "cover",
  },
  caption: {
    fontSize: 12,
    fontStyle: "italic",
    lineHeight: 16,
  },
});
