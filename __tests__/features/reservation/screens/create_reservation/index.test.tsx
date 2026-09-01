import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import CreateReservationScreen from "@/features/reservation/screens/create_reservation";
import { useReservationStore } from "@/features/reservation/store";
import { renderWithProviders } from "@tests/utils";
import { getApiMock, restoreApiMock } from "@tests/__mocks__/api.mock";
import { mockGoBack } from "@tests/__mocks__/navigation.mock";
import es from "@/config/languages/es.json";

jest.mock("@react-navigation/native", () =>
  require("@tests/__mocks__/navigation.mock").navigationMockFactory(),
);

const INITIAL_STORE_STATE = useReservationStore.getState();

const getTodayIso = (): string => new Date().toISOString().slice(0, 10);

describe("features/reservation / CreateReservationScreen", () => {
  afterEach(() => {
    useReservationStore.setState(INITIAL_STORE_STATE, true);
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("renderiza el titulo y el formulario de reserva", () => {
    renderWithProviders(<CreateReservationScreen />);

    expect(screen.getByText(es.reservations.screens.create)).toBeOnTheScreen();
    expect(screen.getByTestId("reservation-form")).toBeOnTheScreen();
    expect(screen.getByTestId("reservation-name-input")).toBeOnTheScreen();
  });

  it("vuelve a la pantalla anterior cuando la reserva se crea con exito", async () => {
    const todayIso = getTodayIso();

    getApiMock().onPost("/reservations").reply(201, {
      id: "res_1",
      name: "Ana Torres",
      phone: "+52 55 1234 5678",
      date: todayIso,
      status: "pending",
      createdAt: "2026-09-01T00:00:00.000Z",
    });

    renderWithProviders(<CreateReservationScreen />);

    fireEvent.changeText(
      screen.getByTestId("reservation-name-input"),
      "Ana Torres",
    );
    fireEvent.changeText(
      screen.getByTestId("reservation-phone-input"),
      "+52 55 1234 5678",
    );
    fireEvent.press(screen.getByTestId("reservation-date-picker"));
    fireEvent.press(
      screen.getByTestId(`reservation-date-picker-day-${todayIso}`),
    );
    fireEvent.press(screen.getByTestId("reservation-date-picker-confirm"));
    fireEvent.press(screen.getByTestId("reservation-submit-button"));

    await waitFor(() => expect(mockGoBack).toHaveBeenCalledTimes(1));
  });
});
