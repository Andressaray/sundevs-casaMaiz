import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import PrivacyScreen from "@/features/privacy/screens/privacy_policy";
import { renderWithProviders } from "@tests/utils";
import { restoreApiMock } from "@tests/__mocks__/api.mock";
import {
  ENDPOINTS,
  mockGetError,
  mockPrivacySuccess,
} from "@tests/__mocks__/handlers.mock";
import { emptyPrivacyDocumentFixture } from "@tests/fixtures/privacy.fixture";
import es from "@/config/languages/es.json";

jest.mock("@react-navigation/native", () =>
  require("@tests/__mocks__/navigation.mock").navigationMockFactory(),
);

jest.mock("@/navigation", () => ({
  __esModule: true,
  default: () => null,
  ROUTES: { "/legal/privacy_policy": "LegalStack" },
}));

describe("features/privacy / PrivacyScreen", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("1. no muestra el contenido del CMS mientras carga", async () => {
    mockPrivacySuccess();

    renderWithProviders(<PrivacyScreen />);

    expect(screen.queryByText("Política de Privacidad")).toBeNull();

    await waitFor(() =>
      expect(screen.getByText("Política de Privacidad")).toBeOnTheScreen(),
    );
  });

  it("2. renderiza el documento legal recibido del CMS", async () => {
    mockPrivacySuccess();

    renderWithProviders(<PrivacyScreen />);

    await waitFor(() =>
      expect(screen.getByText("Política de Privacidad")).toBeOnTheScreen(),
    );

    expect(
      screen.getByText("Como recopilamos, usamos y protegemos tu informacion."),
    ).toBeOnTheScreen();
    expect(screen.getByText("Introduccion")).toBeOnTheScreen();
  });

  it("3. muestra el estado vacio cuando el CMS no trae documento", async () => {
    mockPrivacySuccess(emptyPrivacyDocumentFixture);

    renderWithProviders(<PrivacyScreen />);

    await waitFor(() =>
      expect(screen.getByTestId("empty-component")).toBeOnTheScreen(),
    );
  });

  it("4. muestra el error especifico de privacidad cuando el CMS falla", async () => {
    mockGetError(ENDPOINTS.privacy, 500);

    renderWithProviders(<PrivacyScreen />);

    await waitFor(
      () =>
        expect(
          screen.getByText(es.privacy.messages.loading_error),
        ).toBeOnTheScreen(),
      { timeout: 10000 },
    );

    expect(screen.getByText(es.errors.general_error)).toBeOnTheScreen();
    expect(screen.getByText(es.common.retry)).toBeOnTheScreen();
  });

  it("5. el boton de reintento vuelve a pedir los datos", async () => {
    const adapter = mockGetError(ENDPOINTS.privacy, 500);

    renderWithProviders(<PrivacyScreen />);

    await waitFor(
      () => expect(screen.getByText(es.common.retry)).toBeOnTheScreen(),
      { timeout: 10000 },
    );

    adapter.resetHandlers();
    mockPrivacySuccess();
    fireEvent.press(screen.getByText(es.common.retry));

    await waitFor(() =>
      expect(screen.getByText("Política de Privacidad")).toBeOnTheScreen(),
    );
  });

  it("6. tiene pull-to-refresh conectado al refetch", async () => {
    mockPrivacySuccess();

    renderWithProviders(<PrivacyScreen />);

    await waitFor(() =>
      expect(screen.getByText("Política de Privacidad")).toBeOnTheScreen(),
    );

    const scrollView = screen.UNSAFE_getByType(
      require("react-native").ScrollView as never,
    );

    expect(scrollView.props.refreshControl).toBeTruthy();
    expect(typeof scrollView.props.refreshControl.props.onRefresh).toBe(
      "function",
    );
  });
});
