import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeColors } from "@/theme/ThemeContext";
import { getRadius, SPACING, TYPOGRAPHY } from "@/theme/styles";

import { toIsoDate } from "./dateUtils";

export interface DatePickerCalendarProps {
  monthCursor: Date;
  pendingDate?: Date;
  weekdayLabels: string[];
  calendarDays: (Date | null)[];
  monthLabel: string;
  confirmLabel: string;
  cancelLabel: string;
  previousMonthAccessibilityLabel?: string;
  nextMonthAccessibilityLabel?: string;
  isDayDisabled: (_day: Date) => boolean;
  onSelectDay: (_day: Date) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  testID?: string;
}

const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  pendingDate,
  weekdayLabels,
  calendarDays,
  monthLabel,
  confirmLabel,
  cancelLabel,
  previousMonthAccessibilityLabel,
  nextMonthAccessibilityLabel,
  isDayDisabled,
  onSelectDay,
  onPreviousMonth,
  onNextMonth,
  onCancel,
  onConfirm,
  testID,
}) => {
  const colors = useThemeColors();
  const radius = getRadius();

  const getDayTextColor = (disabled: boolean, isSelected: boolean): string => {
    if (disabled) {
      return colors.textTertiary;
    }
    if (isSelected) {
      return colors.textInverse;
    }
    return colors.textPrimary;
  };

  return (
    <View
      style={[
        styles.calendar,
        { backgroundColor: colors.bgSecondary, borderRadius: radius },
      ]}
    >
      <View style={styles.calendarHeader}>
        <Pressable
          onPress={onPreviousMonth}
          accessibilityLabel={previousMonthAccessibilityLabel}
          style={styles.calendarNavButton}
        >
          <Text style={[TYPOGRAPHY.h4, { color: colors.accentPrimary }]}>
            ‹
          </Text>
        </Pressable>
        <Text style={[TYPOGRAPHY.h4, { color: colors.textPrimary }]}>
          {monthLabel}
        </Text>
        <Pressable
          onPress={onNextMonth}
          accessibilityLabel={nextMonthAccessibilityLabel}
          style={styles.calendarNavButton}
        >
          <Text style={[TYPOGRAPHY.h4, { color: colors.accentPrimary }]}>
            ›
          </Text>
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {weekdayLabels.map((weekday, index) => (
          <Text
            key={`${weekday}-${index}`}
            style={[
              styles.weekdayCell,
              TYPOGRAPHY.caption,
              { color: colors.textTertiary },
            ]}
          >
            {weekday}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {calendarDays.map((day, index) => {
          if (!day) {
            return <View key={`blank-${index}`} style={styles.dayCell} />;
          }

          const disabled = isDayDisabled(day);
          const isSelected = Boolean(
            pendingDate && toIsoDate(pendingDate) === toIsoDate(day),
          );

          return (
            <Pressable
              key={toIsoDate(day)}
              testID={testID ? `${testID}-day-${toIsoDate(day)}` : undefined}
              disabled={disabled}
              onPress={() => onSelectDay(day)}
              style={[
                styles.dayCell,
                isSelected && {
                  backgroundColor: colors.accentPrimary,
                  borderRadius: radius,
                },
              ]}
            >
              <Text
                style={[
                  TYPOGRAPHY.body,
                  { color: getDayTextColor(disabled, isSelected) },
                ]}
              >
                {day.getDate()}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.calendarActions}>
        <Pressable
          testID={testID ? `${testID}-cancel` : undefined}
          onPress={onCancel}
          style={styles.calendarActionButton}
        >
          <Text style={[TYPOGRAPHY.body, { color: colors.textSecondary }]}>
            {cancelLabel}
          </Text>
        </Pressable>
        <Pressable
          testID={testID ? `${testID}-confirm` : undefined}
          onPress={onConfirm}
          disabled={!pendingDate}
          style={styles.calendarActionButton}
        >
          <Text
            style={[
              styles.confirmLabel,
              TYPOGRAPHY.body,
              {
                color: pendingDate ? colors.accentPrimary : colors.textTertiary,
              },
            ]}
          >
            {confirmLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: "100%",
    maxWidth: 340,
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendarNavButton: {
    padding: SPACING.sm,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekdayCell: {
    width: 36,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  calendarActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: SPACING.lg,
    marginTop: SPACING.sm,
  },
  calendarActionButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  confirmLabel: {
    fontWeight: "700",
  },
});

export default DatePickerCalendar;
