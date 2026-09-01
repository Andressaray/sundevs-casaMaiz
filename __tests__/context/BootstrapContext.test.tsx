import React from "react";
import { Text } from "react-native";
import { render, screen, waitFor } from "@testing-library/react-native";
import { QueryClientProvider } from "react-query";
import { BootstrapProvider } from "@/context/BootstrapContext";
import useBootstrap from "@/hooks/useGetBootstrap";
import { createTestQueryClient } from "@tests/utils";
import {
  mockBootstrapError,
  mockBootstrapSuccess,
} from "@tests/__mocks__/handlers.mock";
import { getLastRequest, restoreApiMock } from "@tests/__mocks__/api.mock";
import { APP_VERSION } from "@config/constants";

const Consumer = () => {
  const { data, isError } = useBootstrap();

  if (isError) {
    return <Text testID="consumer">error</Text>;
  }

  return (
    <Text testID="consumer">{data?.data.navigation.items.length ?? 0}</Text>
  );
};

const renderProvider = () =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <BootstrapProvider>
        <Consumer />
      </BootstrapProvider>
    </QueryClientProvider>,
  );

describe("context / BootstrapProvider", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("muestra la pantalla de carga mientras resuelve la query", async () => {
    mockBootstrapSuccess();

    renderProvider();

    expect(screen.queryByTestId("consumer")).toBeNull();

    await waitFor(() => expect(screen.getByTestId("consumer")).toBeTruthy());
  });

  it("entrega los datos a los consumidores cuando la query resuelve", async () => {
    mockBootstrapSuccess();

    renderProvider();

    await waitFor(() =>
      expect(screen.getByTestId("consumer")).toHaveTextContent("4"),
    );
  });

  it("llama a /bootstrap con el contexto de request del proyecto", async () => {
    mockBootstrapSuccess();

    renderProvider();

    await waitFor(() => expect(screen.getByTestId("consumer")).toBeTruthy());

    expect(getLastRequest().url).toBe("/bootstrap");
    expect(getLastRequest().params).toEqual({
      platform: "ios",
      market: "MX",
      audience: "guest",
      appVersion: APP_VERSION,
    });
  });

  it("renderiza a los hijos con isError cuando el CMS falla", async () => {
    mockBootstrapError(500);

    renderProvider();

    await waitFor(() =>
      expect(screen.getByTestId("consumer")).toHaveTextContent("error"),
    );
  });
});
