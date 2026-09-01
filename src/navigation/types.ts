import { NavigationProp } from "@react-navigation/native";
import type { RouteValue } from "./index";

export type RootStackParamList = {
  Tabs: {
    screen?: RouteValue;
    params?: Record<string, unknown>;
  };
  NotFoundStack: undefined;
};

export type RootNavigationProp = NavigationProp<
  RootStackParamList,
  "Tabs" | "NotFoundStack"
>;

export function navigateToRoute(
  navigation: RootNavigationProp,
  route: RouteValue,
): void {
  navigation.navigate("Tabs", { screen: route });
}
