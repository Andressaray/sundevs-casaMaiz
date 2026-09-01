import React from "react";
import { Text } from "react-native";

import EmptyComponent from "@/components/shared/EmptyComponent";
import useTranslation from "@/hooks/useTranslations";

interface PrivacyEmptyProps {
  onRetry?: () => void;
}

const PrivacyEmpty: React.FC<PrivacyEmptyProps> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <EmptyComponent
      icon={<Text style={{ fontSize: 48, lineHeight: 48 }}>🔒</Text>}
      title={t("empty.privacy.title")}
      description={t("empty.privacy.description")}
      actionLabel={onRetry ? t("common.retry") : undefined}
      onAction={onRetry}
      showBorder={false}
    />
  );
};

export default PrivacyEmpty;
