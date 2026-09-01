import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HOME_STACK } from "./stacks/home";
import { MENU_STACK } from "./stacks/menu";
import NotFoundStack, { NOT_FOUND_STACK } from "./stacks/notfound";
import { PRIVACY_STACK } from "./stacks/privacy";
import { RESERVATION_STACK } from "./stacks/reservation";
import TabsStack from "./tabs";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="Tabs" component={TabsStack} />
      <Stack.Screen name={NOT_FOUND_STACK} component={NotFoundStack} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const ROUTES = {
  "/reservas": RESERVATION_STACK,
  "/menu": MENU_STACK,
  "/legal/privacy_policy": PRIVACY_STACK,
  "/": HOME_STACK,
  "/*": NOT_FOUND_STACK,
} as const;

export type RoutePath = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RoutePath];
