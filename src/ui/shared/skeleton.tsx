import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle, StyleProp } from "react-native";

import { useThemeColors } from "../../theme/colors";

interface Props {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

const Skeleton: React.FC<Props> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const colors = useThemeColors();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.4, 0.8, 0.4],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.bgTertiary,
          opacity,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: "hidden",
  },
});

export default Skeleton;
