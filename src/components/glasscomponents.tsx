import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  glassButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  glassInput: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  glassContainer: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  glassBadge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: "light" | "medium" | "dark";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = "medium",
}) => {
  const intensityMap = {
    light: "rgba(255, 255, 255, 0.08)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(255, 255, 255, 0.25)",
  };

  return (
    <View
      style={[
        styles.glassCard,
        {
          backgroundColor: intensityMap[intensity],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  intensity?: "light" | "medium" | "dark";
  disabled?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  intensity = "medium",
  disabled = false,
}) => {
  const [pressed, setPressed] = useState(false);

  const intensityMap = {
    light: "rgba(255, 255, 255, 0.08)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(255, 255, 255, 0.25)",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.glassButton,
          {
            backgroundColor: pressed
              ? intensityMap[intensity === "light" ? "medium" : intensity]
              : intensityMap[intensity],
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface GlassInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (_text: string) => void;
  style?: StyleProp<ViewStyle>;
  intensity?: "light" | "medium" | "dark";
  secureTextEntry?: boolean;
}

export const GlassInput: React.FC<GlassInputProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  intensity = "medium",
  secureTextEntry = false,
}) => {
  const intensityMap = {
    light: "rgba(255, 255, 255, 0.08)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(255, 255, 255, 0.25)",
  };

  return (
    <View
      style={[
        styles.glassInput,
        {
          backgroundColor: intensityMap[intensity],
        },
        style,
      ]}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        secureTextEntry={secureTextEntry}
        style={styles.textInput}
      />
    </View>
  );
};

interface GlassContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: "light" | "medium" | "dark";
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  style,
  intensity = "light",
}) => {
  const intensityMap = {
    light: "rgba(255, 255, 255, 0.08)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(255, 255, 255, 0.25)",
  };

  return (
    <View
      style={[
        styles.glassContainer,
        {
          backgroundColor: intensityMap[intensity],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface GlassBadgeProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  intensity?: "light" | "medium" | "dark";
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
  text,
  style,
  intensity = "medium",
}) => {
  const intensityMap = {
    light: "rgba(255, 255, 255, 0.08)",
    medium: "rgba(255, 255, 255, 0.15)",
    dark: "rgba(255, 255, 255, 0.25)",
  };

  return (
    <View
      style={[
        styles.glassBadge,
        {
          backgroundColor: intensityMap[intensity],
        },
        style,
      ]}
    >
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};
