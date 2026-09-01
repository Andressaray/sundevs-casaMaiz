import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import HomeScreen from "@/features/home/screens/home";
import { renderWithProviders } from "@tests/utils";
import { restoreApiMock } from "@tests/__mocks__/api.mock";
import {
  ENDPOINTS,
  mockGetError,
  mockGetSuccess,
  mockHomeSuccess,
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

describe("features/home / HomeScreen", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("1. muestra skeletons mientras carga", async () => {
    mockHomeSuccess();

    renderWithProviders(<HomeScreen />);

    expect(screen.queryByText("Bienvenido a Casa Maiz")).toBeNull();

    await waitFor(() =>
      expect(screen.getByText("Bienvenido a Casa Maiz")).toBeOnTheScreen(),
    );
  });

  it("2. renderiza los bloques del layout via BlockRenderer", async () => {
    mockHomeSuccess();

    renderWithProviders(<HomeScreen />);

    await waitFor(() =>
      expect(screen.getByText("Bienvenido a Casa Maiz")).toBeOnTheScreen(),
    );

    expect(screen.getByText("Platos destacados")).toBeOnTheScreen();
    expect(screen.getByText("Promociones")).toBeOnTheScreen();
  });

  it("3. muestra HomeEmpty cuando el layout viene vacio", async () => {
    mockGetSuccess(ENDPOINTS.home, emptyPageFixture);

    renderWithProviders(<HomeScreen />);

    await waitFor(() =>
      expect(screen.getByTestId("empty-component")).toBeOnTheScreen(),
    );
  });

  it("4. muestra ErrorFallback con reintento cuando el CMS falla", async () => {
    mockGetError(ENDPOINTS.home, 500);

    renderWithProviders(<HomeScreen />);

    await waitFor(
      () =>
        expect(
          screen.getByText(es.errors.load_restaurant_content),
        ).toBeOnTheScreen(),
      { timeout: 10000 },
    );

    expect(screen.getByText(es.errors.general_error)).toBeOnTheScreen();
    expect(screen.getByText(es.common.retry)).toBeOnTheScreen();
  });

  it("5. el boton de reintento vuelve a pedir los datos", async () => {
    const adapter = mockGetError(ENDPOINTS.home, 500);

    renderWithProviders(<HomeScreen />);

    await waitFor(
      () => expect(screen.getByText(es.common.retry)).toBeOnTheScreen(),
      {
        timeout: 10000,
      },
    );

    adapter.resetHandlers();
    mockHomeSuccess();
    fireEvent.press(screen.getByText(es.common.retry));

    await waitFor(() =>
      expect(screen.getByText("Bienvenido a Casa Maiz")).toBeOnTheScreen(),
    );
  });

  it("6. navega usando ROUTES cuando un bloque lo pide", async () => {
    mockHomeSuccess();

    renderWithProviders(<HomeScreen />);

    await waitFor(() => expect(screen.getByText("Reservar")).toBeOnTheScreen());

    fireEvent.press(screen.getByText("Reservar"));

    expect(mockNavigate).toHaveBeenCalledWith("Tabs", {
      screen: "ReservationStack",
    });
  });

  it("7. tiene pull-to-refresh conectado al refetch", async () => {
    mockHomeSuccess();

    renderWithProviders(<HomeScreen />);

    await waitFor(() =>
      expect(screen.getByText("Bienvenido a Casa Maiz")).toBeOnTheScreen(),
    );

    const list = screen.UNSAFE_getByType(
      require("react-native").FlatList as never,
    );
    expect(list.props.refreshControl).toBeTruthy();
    expect(typeof list.props.refreshControl.props.onRefresh).toBe("function");
  });
});
