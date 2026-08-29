import React from 'react';
import { SafeAreaView, useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BootstrapProvider } from './src/context/BootstrapContext';
import { ThemeProvider } from './src/theme/ThemeContext';
import Navigation from './src/navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
    },
  },
});

const App = (): React.ReactElement => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <BootstrapProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </BootstrapProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
