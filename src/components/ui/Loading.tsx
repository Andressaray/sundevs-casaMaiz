import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FONTS } from "@/config/constants";
import useTranslation from "@/hooks/useTranslations";

import { useThemeColors } from "@/theme/colors";

const CasaMaizLoadingScreen: React.FC = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const loadingWidthAnim = useRef(new Animated.Value(0.1)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 3000,
        useNativeDriver: false,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingWidthAnim, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(loadingWidthAnim, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 750,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const loadingWidth = loadingWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["10%", "90%"],
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.bgPrimary }]}
    >
      <View style={styles.contentContainer}>
        <View style={[styles.leaf, styles.leaf1]} />
        <View style={[styles.leaf, styles.leaf2]} />
        <View style={[styles.leaf, styles.leaf3]} />
        <View style={[styles.leaf, styles.leaf4]} />

        <Animated.View
          style={[
            styles.cornIcon,
            {
              transform: [{ rotate: spin }, { scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.cornCob}>
            <View style={[styles.kernel, styles.kernel1]} />
            <View style={[styles.kernel, styles.kernel2]} />
            <View style={[styles.kernel, styles.kernel3]} />
            <View style={[styles.kernel, styles.kernel4]} />
            <View style={[styles.kernel, styles.kernel5]} />
            <View style={[styles.kernel, styles.kernel6]} />
            <View style={[styles.kernel, styles.kernel7]} />
            <View style={[styles.kernel, styles.kernel8]} />
            <View style={[styles.kernel, styles.kernel9]} />
            <View style={[styles.leafTop, styles.leafTop1]} />
            <View style={[styles.leafTop, styles.leafTop2]} />
          </View>
        </Animated.View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>
          CasaMaiz
        </Text>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
              opacity: opacityAnim,
            },
          ]}
        >
          {t("common.loading")}
        </Animated.Text>

        <View
          style={[
            styles.loadingBarContainer,
            { backgroundColor: colors.bgTertiary },
          ]}
        >
          <Animated.View
            style={[
              styles.loadingBarFill,
              {
                width: loadingWidth,
                backgroundColor: colors.accentPrimary,
              },
            ]}
          />
        </View>

        <Animated.Text
          style={[
            styles.loadingText,
            {
              color: colors.textSecondary,
              opacity: opacityAnim,
            },
          ]}
        >
          {t("loading.preparing")}
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  leaf: {
    position: "absolute",
    opacity: 0.1,
  },

  leaf1: {
    width: 100,
    height: 100,
    top: -50,
    left: -50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#A85C2C",
  },

  leaf2: {
    width: 80,
    height: 80,
    bottom: 20,
    right: -30,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#A85C2C",
  },

  leaf3: {
    width: 60,
    height: 60,
    top: 100,
    right: -30,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#A85C2C",
  },

  leaf4: {
    width: 90,
    height: 90,
    bottom: -40,
    left: -40,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#A85C2C",
  },

  cornIcon: {
    marginBottom: 40,
  },

  cornCob: {
    width: 40,
    height: 70,
    backgroundColor: "#D4A574",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  kernel: {
    position: "absolute",
    width: 6,
    height: 6,
    backgroundColor: "rgba(212, 165, 116, 0.7)",
    borderRadius: 3,
  },

  kernel1: { left: 8, top: 10 },
  kernel2: { left: 17, top: 10 },
  kernel3: { left: 26, top: 10 },
  kernel4: { left: 8, top: 22 },
  kernel5: { left: 17, top: 22 },
  kernel6: { left: 26, top: 22 },
  kernel7: { left: 8, top: 34 },
  kernel8: { left: 17, top: 34 },
  kernel9: { left: 26, top: 34 },

  leafTop: {
    position: "absolute",
    width: 8,
    height: 25,
    backgroundColor: "#5A7A3A",
    top: -15,
    borderRadius: 10,
  },

  leafTop1: {
    left: 8,
    transform: [{ rotate: "-20deg" }],
  },

  leafTop2: {
    right: 8,
    transform: [{ rotate: "20deg" }],
  },

  title: {
    fontSize: 48,
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: FONTS.regular,
  },

  subtitle: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 40,
    letterSpacing: 1,
    textTransform: "uppercase",
    fontWeight: "300",
    fontFamily: FONTS.regular,
  },

  loadingBarContainer: {
    width: 200,
    height: 3,
    borderRadius: 2,
    marginBottom: 20,
    overflow: "hidden",
  },

  loadingBarFill: {
    height: "100%",
    borderRadius: 2,
  },

  loadingText: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: FONTS.regular,
  },
});

export default CasaMaizLoadingScreen;
