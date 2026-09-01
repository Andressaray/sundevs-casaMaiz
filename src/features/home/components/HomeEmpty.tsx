import React from "react";
import { Text } from "react-native";

import EmptyComponent from "@/components/shared/EmptyComponent";
import useTranslation from "@/hooks/useTranslations";

interface HomeEmptyProps {
  onRetry?: () => void;
}

const HomeEmpty: React.FC<HomeEmptyProps> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <EmptyComponent
      icon={<Text style={{ fontSize: 40 }}>🏠</Text>}
      title={t("empty.home.title") || "No hay contenido disponible"}
      description={
        t("empty.home.description") ||
        "Por el momento, no hay contenido para mostrar en la página de inicio. Intenta más tarde."
      }
      actionLabel={onRetry ? t("common.retry") || "Reintentar" : undefined}
      onAction={onRetry}
      showBorder={true}
    />
  );
};

export default HomeEmpty;
