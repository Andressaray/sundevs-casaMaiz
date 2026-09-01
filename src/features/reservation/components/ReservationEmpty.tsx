import React from "react";
import { Text } from "react-native";

import EmptyComponent from "@/components/shared/EmptyComponent";
import useTranslation from "@/hooks/useTranslations";

interface ReservationEmptyProps {
  onCreateReservation?: () => void;
}

const ReservationEmpty: React.FC<ReservationEmptyProps> = ({
  onCreateReservation,
}) => {
  const { t } = useTranslation();

  return (
    <EmptyComponent
      icon={<Text style={{ fontSize: 48, lineHeight: 48 }}>📅</Text>}
      title={t("empty.reservations.title")}
      description={t("empty.reservations.description")}
      actionLabel={
        onCreateReservation ? t("empty.reservations.create_new") : undefined
      }
      onAction={onCreateReservation}
      showBorder={false}
    />
  );
};

export default ReservationEmpty;
