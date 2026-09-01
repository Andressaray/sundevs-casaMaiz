import React from "react";
import { fireEvent, screen } from "@testing-library/react-native";
import { HomeEmpty } from "@/features/home/components";
import es from "@/config/languages/es.json";
import { renderWithProviders } from "@tests/utils";

describe("features/home / HomeEmpty", () => {
  it("renderiza el componente vacio con accion opcional", () => {
    renderWithProviders(<HomeEmpty />);

    expect(screen.getByTestId("empty-component")).toBeOnTheScreen();
    expect(screen.getByTestId("empty-component-icon")).toBeOnTheScreen();
    expect(screen.queryByTestId("empty-component-action")).toBeNull();
  });

  it("llama a onRetry al pulsar la accion", () => {
    const onRetry = jest.fn();
    renderWithProviders(<HomeEmpty onRetry={onRetry} />);

    fireEvent.press(screen.getByTestId("empty-component-action"));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("usa la etiqueta traducida de reintento", () => {
    renderWithProviders(<HomeEmpty onRetry={jest.fn()} />);

    expect(screen.getByText(es.common.retry)).toBeOnTheScreen();
  });

  it("muestra el titulo y la descripcion traducidos", () => {
    renderWithProviders(<HomeEmpty />);

    expect(screen.getByTestId("empty-component-title")).toHaveTextContent(
      es.empty.home.title,
    );
    expect(screen.getByTestId("empty-component-description")).toHaveTextContent(
      es.empty.home.description,
    );
  });
});
