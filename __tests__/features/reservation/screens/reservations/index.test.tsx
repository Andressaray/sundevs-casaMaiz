import React from "react";
import { act, fireEvent, screen } from "@testing-library/react-native";
import ReservationsScreen from "@/features/reservation/screens/reservations";
import { renderWithProviders } from "@tests/utils";
import { mockNavigate } from "@tests/__mocks__/navigation.mock";

jest.mock("@react-navigation/native", () =>
  require("@tests/__mocks__/navigation.mock").navigationMockFactory(),
);

describe("features/reservation / ReservationsScreen", () => {
  it("muestra el estado vacio de reservas", () => {
    renderWithProviders(<ReservationsScreen />);

    expect(screen.getByTestId("empty-component")).toBeOnTheScreen();
    expect(screen.getByTestId("empty-component-action")).toBeOnTheScreen();
  });

  it("el pull-to-refresh activa y desactiva el indicador de recarga", () => {
    jest.useFakeTimers();

    renderWithProviders(<ReservationsScreen />);

    const getList = () =>
      screen.UNSAFE_getByType(require("react-native").FlatList as never);

    expect(getList().props.refreshControl.props.refreshing).toBe(false);

    act(() => {
      getList().props.refreshControl.props.onRefresh();
    });

    expect(getList().props.refreshControl.props.refreshing).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(getList().props.refreshControl.props.refreshing).toBe(false);

    jest.useRealTimers();
  });

  it("todavia usa datos locales, no el CMS", () => {
    renderWithProviders(<ReservationsScreen />);

    const list = screen.UNSAFE_getByType(
      require("react-native").FlatList as never,
    );

    expect(list.props.data).toEqual([]);
  });

  it("navega a CreateReservation al pulsar la accion vacia", () => {
    renderWithProviders(<ReservationsScreen />);

    fireEvent.press(screen.getByTestId("empty-component-action"));

    expect(mockNavigate).toHaveBeenCalledWith("CreateReservation");
  });
});
