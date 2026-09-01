import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppState, AppStateStatus } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { BootstrapProvider } from "./src/context/BootstrapContext";
import { ThemeProvider } from "./src/theme/ThemeContext";
import Navigation from "./src/navigation";
import { cachePersister } from "./src/services/cache/persister";
import CasaMaizLoadingScreen from "./src/components/ui/Loading";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
    },
  },
});

interface PersistenceManagerProps {
  children: React.ReactNode;
}

const PersistenceManager: React.FC<PersistenceManagerProps> = ({
  children,
}) => {
  const client = useQueryClient();
  useEffect(() => {
    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === "background" || state === "inactive") {
        cachePersister.persistClient(client.getQueryCache());
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => subscription.remove();
  }, [client]);

  return children;
};

interface AppContentProps {
  isInitialized: boolean;
}

const AppContent: React.FC<AppContentProps> = ({ isInitialized }) => {
  if (!isInitialized) {
    return <CasaMaizLoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <PersistenceManager>
            <BootstrapProvider>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
            </BootstrapProvider>
          </PersistenceManager>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const App = (): React.ReactElement => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const cachedState = await cachePersister.restoreClient();

        if (cachedState && cachedState.queries) {
          cachedState.queries.forEach(({ queryKey, data, dataUpdatedAt }) => {
            queryClient.setQueryData(queryKey, data, {
              updatedAt: dataUpdatedAt,
            });
          });
        }
      } catch (err) {
        console.error("Failed to initialize cache:", err);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  return <AppContent isInitialized={isInitialized} />;
};

export default App;

type RootStackType = typeof Navigation;

declare module "@react-navigation/native" {
  interface RootNavigator extends RootStackType {}
}
