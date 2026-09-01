import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ReservationEmpty } from "@/features/reservation/components";
import es from "@/config/languages/es.json";

describe("features/reservation / ReservationEmpty", () => {
  it("renderiza el componente vacio", () => {
    render(<ReservationEmpty />);

    expect(screen.getByTestId("empty-component")).toBeOnTheScreen();
  });

  it("ejecuta onCreateReservation al pulsar la accion", () => {
    const onCreateReservation = jest.fn();
    render(<ReservationEmpty onCreateReservation={onCreateReservation} />);

    fireEvent.press(screen.getByTestId("empty-component-action"));

    expect(onCreateReservation).toHaveBeenCalledTimes(1);
  });

  it("oculta la accion cuando no hay handler", () => {
    render(<ReservationEmpty />);

    expect(screen.queryByTestId("empty-component-action")).toBeNull();
  });

  it("muestra el titulo traducido", () => {
    render(<ReservationEmpty />);

    expect(screen.getByTestId("empty-component-title")).toHaveTextContent(
      es.empty.reservations.title,
    );
  });
});
