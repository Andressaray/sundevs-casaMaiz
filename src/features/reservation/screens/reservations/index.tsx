import React, { useCallback } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "@/theme/colors";
import Container from "@/ui/shared/container";

import { ReservationEmpty } from "../../components";

interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
}

const ReservationsScreen = (): React.ReactElement => {
  const navigation = useNavigation();
  const [_reservations] = React.useState<Reservation[]>([]);
  const [isRefetching, setIsRefetching] = React.useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefetching(true);

    setTimeout(() => {
      setIsRefetching(false);
    }, 1000);
  }, []);

  const handleCreateReservation = useCallback(() => {
    navigation.navigate("CreateReservation" as never);
  }, [navigation]);

  return (
    <Container>
      <FlatList
        data={_reservations}
        ListEmptyComponent={
          <ReservationEmpty onCreateReservation={handleCreateReservation} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={COLORS.light.bgTertiary}
            progressViewOffset={10}
          />
        }
        renderItem={({ item }) => <View key={item.id}>{}</View>}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default ReservationsScreen;
