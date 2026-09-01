import { Platform } from "react-native";
import { waitFor } from "@testing-library/react-native";
import useMenuData from "@/features/menu/hooks/useMenuData";
import { renderHookWithProviders } from "@tests/utils";
import { getLastRequest, restoreApiMock } from "@tests/__mocks__/api.mock";
import { mockGetError, mockMenuSuccess } from "@tests/__mocks__/handlers.mock";
import { APP_VERSION } from "@config/constants";

describe("features/menu / useMenuData", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("devuelve el shape acordado por RULES §7.3", async () => {
    mockMenuSuccess();

    const { result } = renderHookWithProviders(() => useMenuData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(Object.keys(result.current).sort()).toEqual([
      "data",
      "error",
      "isError",
      "isLoading",
      "isRefetching",
      "refetch",
    ]);
  });

  it("carga el layout del menu", async () => {
    mockMenuSuccess();

    const { result } = renderHookWithProviders(() => useMenuData());

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.data.slug).toBe("menu");
  });

  it("arma el contexto de request", async () => {
    mockMenuSuccess();

    const { result } = renderHookWithProviders(() => useMenuData());

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(getLastRequest().params).toEqual({
      platform: Platform.OS,
      market: "MX",
      audience: "guest",
      appVersion: APP_VERSION,
    });
  });

  it("expone el error cuando el CMS falla", async () => {
    mockGetError("/pages/menu", 503);

    const { result } = renderHookWithProviders(() => useMenuData());

    await waitFor(() => expect(result.current.error).toBeTruthy(), {
      timeout: 10000,
    });

    expect(result.current.data).toBeUndefined();
  });
});
