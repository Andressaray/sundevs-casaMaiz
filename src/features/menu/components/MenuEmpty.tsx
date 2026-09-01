import React from "react";
import { Text } from "react-native";

import EmptyComponent from "@/components/shared/EmptyComponent";
import useTranslation from "@/hooks/useTranslations";

interface MenuEmptyProps {
  onRetry?: () => void;
}

const MenuEmpty: React.FC<MenuEmptyProps> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <EmptyComponent
      icon={<Text style={{ fontSize: 40 }}>🍽️</Text>}
      title={t("empty.menu.title") || "Menú no disponible"}
      description={
        t("empty.menu.description") ||
        "El menú no está disponible en este momento. Por favor, intenta más tarde o contacta con el restaurante."
      }
      actionLabel={onRetry ? t("common.retry") || "Reintentar" : undefined}
      onAction={onRetry}
      showBorder={true}
    />
  );
};

export default MenuEmpty;
