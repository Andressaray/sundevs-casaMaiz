import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useThemeColors } from '@/theme/ThemeContext';
import useTranslation from '@/hooks/useTranslations';

const NotFoundScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const colors = useThemeColors();
  const { t } = useTranslation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgPrimary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    contentContainer: {
      alignItems: 'center',
      gap: 24,
    },
    errorCode: {
      fontSize: 80,
      fontWeight: '700',
      color: colors.accentPrimary,
      lineHeight: 88,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.textPrimary,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      maxWidth: 300,
    },
    buttonContainer: {
      gap: 12,
      width: '100%',
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: colors.accentPrimary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      minWidth: 200,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: colors.bgSecondary,
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      minWidth: 200,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderColor,
    },
    secondaryButtonText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Tabs' as const,
          params: { screen: 'HomeStack' } as any,
        },
      ],
    });
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      handleGoHome();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.title}>{t('page_not_found')}</Text>
        <Text style={styles.description}>
          {t('page_not_found_description')}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGoHome}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryButtonText}>{t('common.go_home')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleGoBack}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>
              {t('common.go_back')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotFoundScreen;
