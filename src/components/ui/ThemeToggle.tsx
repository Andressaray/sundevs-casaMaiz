import React from 'react';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import { useAppTheme } from '../theme/ThemeContext';
import { SPACING } from '../theme/styles';

/**
 * Componente para cambiar entre light, dark, y auto mode
 */
export const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode, currentTheme, colors } = useAppTheme();

  const modes: Array<{ label: string; value: 'light' | 'dark' | 'auto' }> = [
    { label: '☀️', value: 'light' },
    { label: '🌙', value: 'dark' },
    { label: '🔄', value: 'auto' },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bgSecondary,
          borderColor: colors.borderColor,
        },
      ]}
    >
      {modes.map((mode) => (
        <Pressable
          key={mode.value}
          onPress={() => setThemeMode(mode.value)}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor:
                themeMode === mode.value
                  ? colors.accentPrimary
                  : colors.bgTertiary,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  themeMode === mode.value
                    ? colors.textInverse
                    : colors.textPrimary,
              },
            ]}
          >
            {mode.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: SPACING.lg,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
});
