import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import HomeStack, { HOME_STACK } from '../stacks/home';
import MenuStack, { MENU_STACK } from '../stacks/menu';
import HomeIcon from '@/ui/icons/homeIcon';
import useBootstrap from '@/hooks/useGetBootstrap';
import useTranslation from '@/hooks/useTranslation';
import ReservationIcon from '@/ui/icons/reservationIcon';
import PrivacyIcon from '@/ui/icons/privacyIcon';
import MenuIcon from '@/ui/icons/menuIcon';
import ReservationStack, { RESERVATION_STACK } from '../stacks/reservation';
import PrivacyStack, { PRIVACY_STACK } from '../stacks/privacy';
import { useThemeColors } from '@/theme/colors';

const Tab = createBottomTabNavigator();

function TabsStack() {
  const bootstrap = useBootstrap();
  const colors = useThemeColors();
  const keysOfNavigation = bootstrap.data?.data.navigation.items.map((item) => item.destination.key);
  const { t } = useTranslation();

  const tabs = {
    home: {
      route: HOME_STACK,
      stack: HomeStack,
      label: t('home'),
      icon: HomeIcon
    },
    menu: {
      route: MENU_STACK,
      stack: MenuStack,
      label: t('menu'),
      icon: MenuIcon
    },
    reservations: {
      route: RESERVATION_STACK,
      stack: ReservationStack,
      label: t('reservations'),
      icon: ReservationIcon
    },
    privacy: {
      route: PRIVACY_STACK,
      stack: PrivacyStack,
      label: t('privacy'),
      icon: PrivacyIcon
    }
  };

  const tabsAvailableArray = Object.entries(tabs)
    .filter(([key]) => keysOfNavigation?.includes(key))
    .map(([key, value]) => ({
      key,
      ...value
    }));

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bgSecondary,
          borderTopColor: colors.borderColor,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          fontFamily: 'Poppins',
          marginTop: 4,
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
        tabBarActiveTintColor: colors.accentPrimary,
        tabBarInactiveTintColor: colors.textTertiary,
      })}
    >
      {tabsAvailableArray.map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.route}
          component={tab.stack}
          options={{
            tabBarLabel: tab.label,
            title: tab.label,
            tabBarIcon: ({ color, size }) => (
              <tab.icon 
                width={size} 
                height={size} 
                color={color}
                stroke={color}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default TabsStack;
