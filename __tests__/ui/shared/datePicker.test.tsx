import React from "react";
import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithProviders } from "@tests/utils";
import DatePicker from "@/ui/shared/datePicker";

const baseProps = {
  testID: "date",
  label: "Fecha",
  placeholder: "Selecciona una fecha",
  confirmLabel: "Aceptar",
  cancelLabel: "Cancelar",
  minDate: "2030-01-01",
  locale: "es",
};

describe("ui/shared / DatePicker", () => {
  it("muestra el placeholder cuando no hay valor", () => {
    renderWithProviders(
      <DatePicker {...baseProps} value={undefined} onChange={jest.fn()} />,
    );

    expect(screen.getByText("Selecciona una fecha")).toBeOnTheScreen();
  });

  it("muestra la fecha formateada cuando hay un valor", () => {
    renderWithProviders(
      <DatePicker {...baseProps} value="2030-01-15" onChange={jest.fn()} />,
    );

    expect(screen.queryByText("Selecciona una fecha")).toBeNull();
  });

  it("selecciona un dia y confirma, llamando a onChange con formato ISO", () => {
    const onChange = jest.fn();
    renderWithProviders(
      <DatePicker {...baseProps} value={undefined} onChange={onChange} />,
    );

    fireEvent.press(screen.getByTestId("date"));
    fireEvent.press(screen.getByTestId("date-day-2030-01-15"));
    fireEvent.press(screen.getByTestId("date-confirm"));

    expect(onChange).toHaveBeenCalledWith("2030-01-15");
  });

  it("cancelar cierra el calendario sin llamar a onChange", () => {
    const onChange = jest.fn();
    renderWithProviders(
      <DatePicker {...baseProps} value={undefined} onChange={onChange} />,
    );

    fireEvent.press(screen.getByTestId("date"));
    fireEvent.press(screen.getByTestId("date-day-2030-01-15"));
    fireEvent.press(screen.getByTestId("date-cancel"));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("marca como disabled los dias anteriores a minDate", () => {
    renderWithProviders(
      <DatePicker
        {...baseProps}
        minDate="2030-01-10"
        value={undefined}
        onChange={jest.fn()}
      />,
    );

    fireEvent.press(screen.getByTestId("date"));

    expect(
      screen.getByTestId("date-day-2030-01-05").props.accessibilityState
        ?.disabled,
    ).toBe(true);
    expect(
      screen.getByTestId("date-day-2030-01-15").props.accessibilityState
        ?.disabled,
    ).toBeFalsy();
  });

  it("muestra el mensaje de error cuando se provee", () => {
    renderWithProviders(
      <DatePicker
        {...baseProps}
        value={undefined}
        onChange={jest.fn()}
        errorMessage="La fecha es obligatoria"
      />,
    );

    expect(screen.getByText("La fecha es obligatoria")).toBeOnTheScreen();
  });
});
