import React, { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeColors } from "@/theme/ThemeContext";
import { getRadius, SPACING, TYPOGRAPHY } from "@/theme/styles";

import {
  buildCalendarDays,
  parseIsoDate,
  startOfDay,
  toIsoDate,
} from "./dateUtils";
import DatePickerCalendar from "./datePickerCalendar";

export interface DatePickerProps {
  label: string;
  value?: string;
  onChange: (_value: string) => void;
  placeholder: string;
  confirmLabel: string;
  cancelLabel: string;
  minDate?: string;
  errorMessage?: string;
  locale?: string;
  previousMonthAccessibilityLabel?: string;
  nextMonthAccessibilityLabel?: string;
  testID?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder,
  confirmLabel,
  cancelLabel,
  minDate,
  errorMessage,
  locale = "en",
  previousMonthAccessibilityLabel,
  nextMonthAccessibilityLabel,
  testID,
}) => {
  const colors = useThemeColors();
  const radius = getRadius();
  const hasError = !!errorMessage;

  const selectedDate = parseIsoDate(value);
  const minSelectableDate = startOfDay(parseIsoDate(minDate) ?? new Date());

  const [isVisible, setIsVisible] = useState(false);
  const [monthCursor, setMonthCursor] = useState<Date>(
    selectedDate ?? minSelectableDate,
  );
  const [pendingDate, setPendingDate] = useState<Date | undefined>(
    selectedDate,
  );

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale],
  );
  const weekdayFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short" }),
    [locale],
  );
  const displayFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { dateStyle: "medium" }),
    [locale],
  );

  const weekdayLabels = useMemo(() => {
    const referenceSunday = new Date(2023, 0, 1);
    return Array.from({ length: 7 }, (_unused, index) => {
      const day = new Date(referenceSunday);
      day.setDate(referenceSunday.getDate() + index);
      return weekdayFormatter.format(day);
    });
  }, [weekdayFormatter]);

  const calendarDays = useMemo(
    () => buildCalendarDays(monthCursor),
    [monthCursor],
  );

  const openPicker = (): void => {
    setPendingDate(selectedDate);
    setMonthCursor(selectedDate ?? minSelectableDate);
    setIsVisible(true);
  };

  const closePicker = (): void => setIsVisible(false);

  const handleConfirm = (): void => {
    if (pendingDate) {
      onChange(toIsoDate(pendingDate));
    }
    closePicker();
  };

  const goToPreviousMonth = (): void => {
    setMonthCursor(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = (): void => {
    setMonthCursor(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  };

  const isDayDisabled = (day: Date): boolean =>
    startOfDay(day).getTime() < minSelectableDate.getTime();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          TYPOGRAPHY.caption,
          { color: colors.textSecondary },
        ]}
      >
        {label}
      </Text>
      <Pressable
        testID={testID}
        onPress={openPicker}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[
          styles.field,
          {
            borderRadius: radius,
            borderColor: hasError ? colors.error : colors.borderColor,
            backgroundColor: colors.bgSecondary,
          },
        ]}
      >
        <Text
          style={[
            TYPOGRAPHY.body,
            {
              color: selectedDate ? colors.textPrimary : colors.textTertiary,
            },
          ]}
        >
          {selectedDate ? displayFormatter.format(selectedDate) : placeholder}
        </Text>
      </Pressable>
      {hasError ? (
        <Text
          style={[styles.error, TYPOGRAPHY.caption, { color: colors.error }]}
        >
          {errorMessage}
        </Text>
      ) : null}

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={closePicker}
        testID={testID ? `${testID}-modal` : undefined}
      >
        <Pressable style={styles.backdrop} onPress={closePicker}>
          <Pressable onPress={(event) => event.stopPropagation()}>
            <DatePickerCalendar
              monthCursor={monthCursor}
              pendingDate={pendingDate}
              weekdayLabels={weekdayLabels}
              calendarDays={calendarDays}
              monthLabel={monthFormatter.format(monthCursor)}
              confirmLabel={confirmLabel}
              cancelLabel={cancelLabel}
              previousMonthAccessibilityLabel={previousMonthAccessibilityLabel}
              nextMonthAccessibilityLabel={nextMonthAccessibilityLabel}
              isDayDisabled={isDayDisabled}
              onSelectDay={setPendingDate}
              onPreviousMonth={goToPreviousMonth}
              onNextMonth={goToNextMonth}
              onCancel={closePicker}
              onConfirm={handleConfirm}
              testID={testID}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
    width: "100%",
  },
  label: {
    marginBottom: SPACING.xs,
  },
  field: {
    borderWidth: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    justifyContent: "center",
  },
  error: {
    marginTop: SPACING.xs,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
});

export default DatePicker;
