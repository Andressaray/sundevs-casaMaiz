import React, { PropsWithChildren, ReactElement } from "react";
import {
  render,
  renderHook,
  RenderOptions,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/theme/ThemeContext";
import { createTestQueryClient } from "./queryClient";

export interface ProvidersOptions {
  withNavigation?: boolean;

  queryClient?: QueryClient;
}

export const buildWrapper = ({
  withNavigation = false,
  queryClient = createTestQueryClient(),
}: ProvidersOptions = {}) => {
  const Wrapper = ({ children }: PropsWithChildren): ReactElement => {
    const tree = (
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 47, left: 0, right: 0, bottom: 34 },
        }}
      >
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    );

    if (withNavigation) {
      return <NavigationContainer>{tree}</NavigationContainer>;
    }

    return tree;
  };

  return Wrapper;
};

export interface RenderWithProvidersOptions
  extends Omit<RenderOptions, "wrapper">, ProvidersOptions {}

export const renderWithProviders = (
  ui: ReactElement,
  { withNavigation, queryClient, ...options }: RenderWithProvidersOptions = {},
) => {
  const client = queryClient ?? createTestQueryClient();

  return {
    queryClient: client,
    ...render(ui, {
      wrapper: buildWrapper({ withNavigation, queryClient: client }),
      ...options,
    }),
  };
};

export const renderHookWithProviders = <TResult, TProps>(
  hook: (_props: TProps) => TResult,
  { withNavigation, queryClient, ...options }: RenderWithProvidersOptions = {},
) => {
  const client = queryClient ?? createTestQueryClient();

  return {
    queryClient: client,
    ...renderHook(hook, {
      wrapper: buildWrapper({ withNavigation, queryClient: client }),
      ...options,
    }),
  };
};
