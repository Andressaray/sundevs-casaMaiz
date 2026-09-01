import React from "react";

import { ErrorFallback } from "@/components/ui/ErrorFallback";

interface PrivacyErrorProps {
  error?: Error | string;
  onRetry?: () => void;
}

const PrivacyError: React.FC<PrivacyErrorProps> = ({ error, onRetry }) => {
  return (
    <ErrorFallback
      error={error}
      titleKey="errors.general_error"
      messageKey="privacy.messages.loading_error"
      retryLabelKey="common.retry"
      onRetry={onRetry}
      showDetails={false}
    />
  );
};

export default PrivacyError;
