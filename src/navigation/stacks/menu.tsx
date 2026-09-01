import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuScreen from "@/features/menu/screens/menu";

const Stack = createNativeStackNavigator();

export const MENU_STACK = "MenuStack";

const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Menu" component={MenuScreen} />
    </Stack.Navigator>
  );
};

export default MenuStack;
