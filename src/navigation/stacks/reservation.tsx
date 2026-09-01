import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateReservationScreen from "@/features/reservation/screens/create_reservation";
import ReservationsScreen from "@/features/reservation/screens/reservations";
import { useThemeColors } from "@/theme/colors";
import HeaderBackButton from "@/ui/shared/headerBackButton";

const Stack = createNativeStackNavigator();

export const RESERVATION_STACK = "ReservationStack";

const ReservationStack = () => {
  const colors = useThemeColors();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.bgPrimary,
        },
      }}
    >
      <Stack.Screen name="Reservation" component={ReservationsScreen} />
      <Stack.Screen
        name="CreateReservation"
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.bgPrimary },
          headerLeft: () => <HeaderBackButton />,
        }}
        component={CreateReservationScreen}
      />
    </Stack.Navigator>
  );
};

export default ReservationStack;
