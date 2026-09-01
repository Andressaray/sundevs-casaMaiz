import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import MenuScreen from "@/features/menu/screens/menu";
import { renderWithProviders } from "@tests/utils";
import { restoreApiMock } from "@tests/__mocks__/api.mock";
import {
  ENDPOINTS,
  mockGetError,
  mockGetSuccess,
  mockMenuSuccess,
} from "@tests/__mocks__/handlers.mock";
import { emptyPageFixture } from "@tests/fixtures/page.fixture";
import { mockNavigate } from "@tests/__mocks__/navigation.mock";
import es from "@/config/languages/es.json";

jest.mock("@react-navigation/native", () =>
  require("@tests/__mocks__/navigation.mock").navigationMockFactory(),
);

jest.mock("@/navigation", () => ({
  __esModule: true,
  default: () => null,
  ROUTES: {
    "/reservas": "ReservationStack",
    "/menu": "MenuStack",
    "/legal/privacy_policy": "LegalStack",
    "/": "HomeStack",
    "/*": "NotFoundStack",
  },
}));

describe("features/menu / MenuScreen", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("1. no muestra contenido del CMS mientras carga", async () => {
    mockMenuSuccess();

    renderWithProviders(<MenuScreen />);

    expect(screen.queryByText("Platos destacados")).toBeNull();

    await waitFor(() =>
      expect(screen.getByText("Platos destacados")).toBeOnTheScreen(),
    );
  });

  it("2. renderiza los bloques del menu", async () => {
    mockMenuSuccess();

    renderWithProviders(<MenuScreen />);

    await waitFor(() =>
      expect(screen.getByText("Bienvenido a Casa Maiz")).toBeOnTheScreen(),
    );

    expect(screen.getByText("Tlayuda")).toBeOnTheScreen();
    expect(screen.getByText("$180")).toBeOnTheScreen();
  });

  it("3. muestra MenuEmpty con layout vacio", async () => {
    mockGetSuccess(ENDPOINTS.menu, emptyPageFixture);

    renderWithProviders(<MenuScreen />);

    await waitFor(() =>
      expect(screen.getByTestId("empty-component")).toBeOnTheScreen(),
    );
  });

  it("4. muestra el error especifico de menu", async () => {
    mockGetError(ENDPOINTS.menu, 500);

    renderWithProviders(<MenuScreen />);

    await waitFor(
      () =>
        expect(screen.getByText(es.errors.load_menu_error)).toBeOnTheScreen(),
      { timeout: 10000 },
    );
  });

  it("5. navega usando ROUTES desde un bloque", async () => {
    mockMenuSuccess();

    renderWithProviders(<MenuScreen />);

    await waitFor(() => expect(screen.getByText("Ver menu")).toBeOnTheScreen());

    fireEvent.press(screen.getByText("Ver menu"));

    expect(mockNavigate).toHaveBeenCalledWith("Tabs", {
      screen: "MenuStack",
    });
  });

  it("6. expone pull-to-refresh", async () => {
    mockMenuSuccess();

    renderWithProviders(<MenuScreen />);

    await waitFor(() =>
      expect(screen.getByText("Platos destacados")).toBeOnTheScreen(),
    );

    const list = screen.UNSAFE_getByType(
      require("react-native").FlatList as never,
    );

    expect(list.props.refreshControl).toBeTruthy();
  });
});
