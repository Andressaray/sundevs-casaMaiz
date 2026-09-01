import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { FONTS } from "@/config/constants";
import useBootstrap from "@/hooks/useGetBootstrap";
import useTranslation from "@/hooks/useTranslations";
import { useThemeColors } from "@/theme/colors";
import HomeIcon from "@/ui/icons/homeIcon";
import MenuIcon from "@/ui/icons/menuIcon";
import PrivacyIcon from "@/ui/icons/privacyIcon";
import ReservationIcon from "@/ui/icons/reservationIcon";

import HomeStack, { HOME_STACK } from "../stacks/home";
import MenuStack, { MENU_STACK } from "../stacks/menu";
import PrivacyStack, { PRIVACY_STACK } from "../stacks/privacy";
import ReservationStack, { RESERVATION_STACK } from "../stacks/reservation";

const Tab = createBottomTabNavigator();

function TabsStack() {
  const bootstrap = useBootstrap();
  const colors = useThemeColors();
  const { t } = useTranslation();

  const tabs = {
    home: {
      route: HOME_STACK,
      stack: HomeStack,
      label: t("home"),
      icon: HomeIcon,
      hideTabBarOnRoutes: [] as string[],
    },
    menu: {
      route: MENU_STACK,
      stack: MenuStack,
      label: t("menu"),
      icon: MenuIcon,
      hideTabBarOnRoutes: [] as string[],
    },
    reservations: {
      route: RESERVATION_STACK,
      stack: ReservationStack,
      label: t("reservations.tab"),
      icon: ReservationIcon,
      hideTabBarOnRoutes: ["CreateReservation"] as string[],
    },
    privacy: {
      route: PRIVACY_STACK,
      stack: PrivacyStack,
      label: t("privacy.tab"),
      icon: PrivacyIcon,
      hideTabBarOnRoutes: [] as string[],
    },
  };

  const labelsFromCms = new Map(
    (bootstrap.data?.data?.navigation?.items ?? []).map((item) => [
      item.destination.key,
      item.label,
    ]),
  );

  const enabledTabs = Object.entries(tabs).filter(([key]) =>
    labelsFromCms.has(key),
  );

  const tabsAvailableArray = (
    enabledTabs.length > 0 ? enabledTabs : Object.entries(tabs)
  ).map(([key, value]) => ({
    key,
    ...value,
    label: labelsFromCms.get(key) ?? value.label,
  }));

  const defaultTabBarStyle = {
    backgroundColor: colors.bgSecondary,
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: defaultTabBarStyle,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          fontFamily: FONTS.regular,
        },
        tabBarIconStyle: {
          width: 24,
          height: 24,
        },
        tabBarActiveTintColor: colors.accentPrimary,
        tabBarInactiveTintColor: colors.textTertiary,
      }}
    >
      {tabsAvailableArray.map((tab) => (
        <Tab.Screen
          key={tab.key}
          name={tab.route}
          component={tab.stack}
          options={({ route }) => {
            const focusedRouteName = getFocusedRouteNameFromRoute(route) ?? "";
            const shouldHideTabBar =
              tab.hideTabBarOnRoutes?.includes(focusedRouteName) ?? false;

            return {
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
              tabBarStyle: shouldHideTabBar
                ? { display: "none" }
                : defaultTabBarStyle,
            };
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default TabsStack;
