import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import ReservationForm from "@/features/reservation/components/ReservationForm";
import { useReservationStore } from "@/features/reservation/store";
import { renderWithProviders } from "@tests/utils";
import { getApiMock, restoreApiMock } from "@tests/__mocks__/api.mock";
import es from "@/config/languages/es.json";

const INITIAL_STORE_STATE = useReservationStore.getState();

const getTodayIso = (): string => new Date().toISOString().slice(0, 10);

const fillValidForm = (): void => {
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
    screen.getByTestId(`reservation-date-picker-day-${getTodayIso()}`),
  );
  fireEvent.press(screen.getByTestId("reservation-date-picker-confirm"));
};

describe("features/reservation / ReservationForm", () => {
  afterEach(() => {
    useReservationStore.setState(INITIAL_STORE_STATE, true);
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("el boton de enviar arranca deshabilitado", () => {
    renderWithProviders(<ReservationForm />);

    expect(
      screen.getByTestId("reservation-submit-button").props.accessibilityState
        .disabled,
    ).toBe(true);
  });

  it("muestra los errores de validacion despues de tocar los campos", () => {
    renderWithProviders(<ReservationForm />);

    fireEvent.changeText(screen.getByTestId("reservation-name-input"), "Al");

    expect(
      screen.getByTestId("reservation-name-input-error"),
    ).toHaveTextContent(es.reservations.form.errors.name_too_short);
  });

  it("habilita el boton de enviar cuando el formulario es valido", () => {
    renderWithProviders(<ReservationForm />);

    fillValidForm();

    expect(
      screen.getByTestId("reservation-submit-button").props.accessibilityState
        .disabled,
    ).toBe(false);
  });

  it("al enviar, guarda la informacion en el store y llama a onSuccess", async () => {
    const todayIso = getTodayIso();

    getApiMock().onPost("/reservations").reply(201, {
      id: "res_1",
      name: "Ana Torres",
      phone: "+52 55 1234 5678",
      date: todayIso,
      status: "pending",
      createdAt: "2026-09-01T00:00:00.000Z",
    });

    const onSuccess = jest.fn();
    renderWithProviders(<ReservationForm onSuccess={onSuccess} />);

    fillValidForm();
    fireEvent.press(screen.getByTestId("reservation-submit-button"));

    await waitFor(() =>
      expect(useReservationStore.getState().reservation).toEqual({
        name: "Ana Torres",
        phone: "+52 55 1234 5678",
        date: todayIso,
      }),
    );

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });

  it("muestra un mensaje de error cuando el envio falla", async () => {
    getApiMock().onPost("/reservations").reply(500, { error: "fail" });

    renderWithProviders(<ReservationForm />);

    fillValidForm();
    fireEvent.press(screen.getByTestId("reservation-submit-button"));

    await waitFor(() =>
      expect(screen.getByTestId("reservation-submit-error")).toBeOnTheScreen(),
    );
  });
});
