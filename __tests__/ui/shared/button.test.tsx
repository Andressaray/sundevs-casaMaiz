import React from "react";
import { fireEvent, screen } from "@testing-library/react-native";
import { renderWithProviders } from "@tests/utils";
import Button from "@/ui/shared/button";

describe("ui/shared / Button", () => {
  it("renderiza el label y responde al press", () => {
    const onPress = jest.fn();
    renderWithProviders(
      <Button testID="submit" label="Confirmar" onPress={onPress} />,
    );

    fireEvent.press(screen.getByTestId("submit"));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Confirmar")).toBeOnTheScreen();
  });

  it("no responde al press cuando esta disabled", () => {
    const onPress = jest.fn();
    renderWithProviders(
      <Button testID="submit" label="Confirmar" onPress={onPress} disabled />,
    );

    fireEvent.press(screen.getByTestId("submit"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("muestra un indicador de carga y oculta el label cuando loading es true", () => {
    renderWithProviders(
      <Button testID="submit" label="Confirmar" onPress={jest.fn()} loading />,
    );

    expect(screen.getByTestId("submit-loading")).toBeOnTheScreen();
    expect(screen.queryByText("Confirmar")).toBeNull();
  });
});
