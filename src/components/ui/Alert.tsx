import React, { useEffect, useRef, useState } from "react";

import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemeColors } from "../../theme/colors";
import { SPACING } from "../../theme/styles";
import { Alert } from "@/types/bootstrap.types";

interface AlertComponentProps {
  alert: Alert;
  onDismiss?: (_id: string) => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({
  alert,
  onDismiss,
}) => {
  const colors = useThemeColors();
  const navigation = useNavigation();
  const [dismissed, setDismissed] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getThumbnailUrl = (): string | undefined => {
    if (!alert.image) {
      return undefined;
    }
    return alert.image.sizes?.thumbnail?.url || alert.image.url;
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  if (dismissed) {
    return null;
  }

  const handleDismiss = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setDismissed(true);
      onDismiss?.(alert.id);
    });
  };

  const getModeColor = () => {
    switch (alert.priority) {
      case 100:
        return "#EF4938";
      case 50:
        return "#F59E0B";
      default:
        return colors.accentPrimary;
    }
  };

  const thumbnailUrl = getThumbnailUrl();

  return (
    <Animated.View
      style={[
        styles.alertWrapper,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: getModeColor(),
          },
        ]}
      >
        <View style={styles.mainRow}>
          {thumbnailUrl && (
            <Image
              source={{ uri: thumbnailUrl }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          )}

          <View style={styles.textContent}>
            <Text style={[styles.title, { color: "white" }]}>
              {alert.title}
            </Text>
            <Text style={[styles.message, { color: "rgba(255,255,255,0.9)" }]}>
              {alert.message}
            </Text>
            {alert.actions && alert.actions.length > 0 && (
              <View style={styles.buttonsContainer}>
                {alert.actions.map((action, idx) => (
                  <Pressable
                    key={idx}
                    style={[
                      styles.actionButton,
                      idx > 0 && { marginLeft: SPACING.sm },
                    ]}
                    onPress={() => {
                      const route = action.href.replace("/", "");
                      navigation.navigate(route as never);
                      handleDismiss();
                    }}
                  >
                    <Text style={styles.actionLabel}>{action.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {alert.dismissible && (
            <Pressable onPress={handleDismiss} style={styles.closeButton}>
              <Text style={styles.closeLabel}>✕</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertWrapper: {
    width: "100%",
  },
  container: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 8,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  textContent: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  actionButton: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 4,
  },
  actionLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  closeLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AlertComponent;
