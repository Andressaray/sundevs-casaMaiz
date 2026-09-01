import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PrivacyScreen from "@/features/privacy/screens/privacy_policy";

const Stack = createNativeStackNavigator();

export const PRIVACY_STACK = "LegalStack";

const PrivacyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="legal" component={PrivacyScreen} />
      <Stack.Screen name="legal/privacy_policy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default PrivacyStack;
