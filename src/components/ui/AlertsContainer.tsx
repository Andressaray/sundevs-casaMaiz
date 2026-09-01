import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BootstrapContext from "@/context/BootstrapContext";
import AlertComponent from "./Alert";
import { Alert } from "@/types/bootstrap.types";

interface DismissedAlerts {
  [key: string]: boolean;
}

const AlertsContainer: React.FC = () => {
  const bootstrapContext = useContext(BootstrapContext);
  const [dismissedAlerts, setDismissedAlerts] = useState<DismissedAlerts>({});
  const insets = useSafeAreaInsets();

  if (!bootstrapContext || !bootstrapContext.data) {
    return null;
  }

  const { data } = bootstrapContext;
  const alerts = data.data?.alerts || [];

  const handleDismiss = useCallback((alertId: string) => {
    setDismissedAlerts((prev) => ({
      ...prev,
      [alertId]: true,
    }));
  }, []);

  const visibleAlerts = alerts.filter(
    (alert: Alert) => !dismissedAlerts[alert.id],
  );

  if (visibleAlerts.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { top: insets.top }]}>
      {visibleAlerts.map((alert: Alert) => (
        <AlertComponent
          key={alert.id}
          alert={alert}
          onDismiss={handleDismiss}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1000,
    width: "100%",
  },
});

export default AlertsContainer;
