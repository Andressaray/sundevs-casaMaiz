import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NotFoundScreen from "@/features/notfound/screens/notfound";

const Stack = createNativeStackNavigator();

export const NOT_FOUND_STACK = "NotFoundStack";

const NotFoundStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="NotFound"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="NotFound" component={NotFoundScreen} />
    </Stack.Navigator>
  );
};

export default NotFoundStack;
