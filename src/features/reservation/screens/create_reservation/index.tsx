import React, { useCallback } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import useTranslation from "@/hooks/useTranslations";
import { useThemeColors } from "@/theme/ThemeContext";
import { SPACING, TYPOGRAPHY } from "@/theme/styles";

import { ReservationForm } from "../../components";

const CreateReservationScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const colors = useThemeColors();

  const handleSuccess = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[styles.title, TYPOGRAPHY.h2, { color: colors.textPrimary }]}
        >
          {t("reservations.screens.create")}
        </Text>
        <Text
          style={[
            styles.subtitle,
            TYPOGRAPHY.body,
            { color: colors.textSecondary },
          ]}
        >
          {t("reservations.subtitle")}
        </Text>
        <ReservationForm onSuccess={handleSuccess} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    padding: SPACING.xl,
    gap: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.xs,
  },
  subtitle: {
    marginBottom: SPACING.lg,
  },
});

export default CreateReservationScreen;
