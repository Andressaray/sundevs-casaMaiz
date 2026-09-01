import React from "react";
import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithProviders } from "@tests/utils";
import Input from "@/ui/shared/input";

describe("ui/shared / Input", () => {
  it("renderiza el label y el valor", () => {
    renderWithProviders(
      <Input
        testID="name"
        label="Nombre"
        value="Ana"
        onChangeText={jest.fn()}
      />,
    );

    expect(screen.getByText("Nombre")).toBeOnTheScreen();
    expect(screen.getByTestId("name").props.value).toBe("Ana");
  });

  it("llama a onChangeText al escribir", () => {
    const onChangeText = jest.fn();
    renderWithProviders(
      <Input
        testID="name"
        label="Nombre"
        value=""
        onChangeText={onChangeText}
      />,
    );

    fireEvent.changeText(screen.getByTestId("name"), "Ana Torres");

    expect(onChangeText).toHaveBeenCalledWith("Ana Torres");
  });

  it("muestra el mensaje de error cuando se provee", () => {
    renderWithProviders(
      <Input
        testID="name"
        label="Nombre"
        value=""
        onChangeText={jest.fn()}
        errorMessage="El nombre es obligatorio"
      />,
    );

    expect(screen.getByTestId("name-error")).toHaveTextContent(
      "El nombre es obligatorio",
    );
  });

  it("no muestra error cuando no se provee", () => {
    renderWithProviders(
      <Input testID="name" label="Nombre" value="" onChangeText={jest.fn()} />,
    );

    expect(screen.queryByTestId("name-error")).toBeNull();
  });
});
