import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import useTranslation from "@/hooks/useTranslations";
import { useThemeColors } from "@/theme/ThemeContext";
import { SPACING, TYPOGRAPHY } from "@/theme/styles";
import Button from "@/ui/shared/button";
import DatePicker from "@/ui/shared/datePicker";
import Input from "@/ui/shared/input";

import { useCreateReservation } from "../hooks";
import {
  ReservationFormErrors,
  ReservationInputs,
} from "../types/reservation.types";
import {
  isReservationFormValid,
  validateReservationForm,
} from "../utils/validation";

interface ReservationFormProps {
  onSuccess?: () => void;
}

type TouchedFields = Record<keyof ReservationInputs, boolean>;
const INITIAL_FORM_DATA: ReservationInputs = {
  name: "",
  phone: "",
  date: "",
};
const INITIAL_TOUCHED: TouchedFields = {
  name: false,
  phone: false,
  date: false,
};

const getTodayIso = (): string => new Date().toISOString().slice(0, 10);

const ReservationForm: React.FC<ReservationFormProps> = ({ onSuccess }) => {
  const { t, language } = useTranslation();
  const colors = useThemeColors();
  const { createReservation, isLoading, isError } = useCreateReservation();

  const [formData, setFormData] =
    useState<ReservationInputs>(INITIAL_FORM_DATA);
  const [touched, setTouched] = useState<TouchedFields>(INITIAL_TOUCHED);

  const errors: ReservationFormErrors = useMemo(
    () => validateReservationForm(formData),
    [formData],
  );

  const isFormValid = useMemo(() => isReservationFormValid(errors), [errors]);
  const todayIso = useMemo(() => getTodayIso(), []);

  const handleChange = useCallback(
    (field: keyof ReservationInputs) => (value: string) => {
      setFormData((current) => ({ ...current, [field]: value }));
      setTouched((current) => ({ ...current, [field]: true }));
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setTouched({ name: true, phone: true, date: true });

    if (!isFormValid) {
      return;
    }

    createReservation(formData, { onSuccess });
  }, [createReservation, formData, isFormValid, onSuccess]);

  const getFieldError = (
    field: keyof ReservationInputs,
  ): string | undefined => {
    if (!touched[field] || !errors[field]) {
      return undefined;
    }
    return t(errors[field] as string);
  };

  return (
    <View style={styles.container} testID="reservation-form">
      <Input
        testID="reservation-name-input"
        label={t("reservations.labels.name")}
        placeholder={t("reservations.form.name_placeholder")}
        value={formData.name}
        onChangeText={handleChange("name")}
        errorMessage={getFieldError("name")}
        autoCapitalize="words"
        returnKeyType="next"
      />
      <Input
        testID="reservation-phone-input"
        label={t("reservations.labels.phone")}
        placeholder={t("reservations.form.phone_placeholder")}
        value={formData.phone}
        onChangeText={handleChange("phone")}
        errorMessage={getFieldError("phone")}
        keyboardType="phone-pad"
        returnKeyType="done"
      />
      <DatePicker
        testID="reservation-date-picker"
        label={t("reservations.labels.date")}
        placeholder={t("reservations.form.date_placeholder")}
        confirmLabel={t("common.accept")}
        cancelLabel={t("common.cancel")}
        previousMonthAccessibilityLabel={t("reservations.form.previous_month")}
        nextMonthAccessibilityLabel={t("reservations.form.next_month")}
        value={formData.date || undefined}
        onChange={handleChange("date")}
        minDate={todayIso}
        locale={language}
        errorMessage={getFieldError("date")}
      />

      {isError ? (
        <Text
          testID="reservation-submit-error"
          style={[
            TYPOGRAPHY.caption,
            styles.submitError,
            { color: colors.error },
          ]}
        >
          {t("reservations.messages.error_creating")}
        </Text>
      ) : null}

      <Button
        testID="reservation-submit-button"
        label={t("reservations.actions.create")}
        onPress={handleSubmit}
        disabled={!isFormValid}
        loading={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.lg,
    width: "100%",
  },
  submitError: {
    textAlign: "center",
  },
});

export default ReservationForm;
