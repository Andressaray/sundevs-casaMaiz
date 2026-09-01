import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import useTranslation from "@/hooks/useTranslations";
import { useThemeColors } from "@/theme/ThemeContext";
import { SPACING } from "@/theme/styles";
import ArrowBackIcon from "@/ui/icons/arrowBackIcon";

const HeaderBackButton = (): React.ReactElement => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const colors = useThemeColors();

  const handlePress = (): void => {
    navigation.goBack();
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={SPACING.md}
      accessibilityRole="button"
      accessibilityLabel={t("common.go_back")}
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.6 : 1 }]}
    >
      <ArrowBackIcon color={colors.textPrimary} width={22} height={22} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
});

export default HeaderBackButton;
