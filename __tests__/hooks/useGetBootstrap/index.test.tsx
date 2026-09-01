/* eslint-disable max-nested-callbacks */
import React, { PropsWithChildren } from "react";
import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClientProvider } from "react-query";
import useBootstrap from "@/hooks/useGetBootstrap";
import { BootstrapProvider } from "@/context/BootstrapContext";
import { createTestQueryClient } from "@tests/utils";
import { mockBootstrapSuccess } from "@tests/__mocks__/handlers.mock";
import { restoreApiMock } from "@tests/__mocks__/api.mock";
import { bootstrapFixture } from "@tests/fixtures/bootstrap.fixture";

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={createTestQueryClient()}>
    <BootstrapProvider>{children}</BootstrapProvider>
  </QueryClientProvider>
);

describe("hooks / useBootstrap", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("lanza un error si se usa fuera del BootstrapProvider", () => {
    expect(() => renderHook(() => useBootstrap())).toThrow(
      "useBootstrap must be used within a BootstrapProvider",
    );
  });

  it("devuelve los datos del bootstrap dentro del provider", async () => {
    mockBootstrapSuccess();

    const { result } = renderHook(() => useBootstrap(), { wrapper });

    await waitFor(() => expect(result.current?.data).toBeDefined());

    expect(result.current.data).toEqual(bootstrapFixture);
    expect(result.current.isError).toBe(false);
    expect(typeof result.current.refetch).toBe("function");
  });
});
