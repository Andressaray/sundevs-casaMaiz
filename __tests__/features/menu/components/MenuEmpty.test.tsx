import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { MenuEmpty } from "@/features/menu/components";
import es from "@/config/languages/es.json";

describe("features/menu / MenuEmpty", () => {
  it("renderiza el componente vacio", () => {
    render(<MenuEmpty />);

    expect(screen.getByTestId("empty-component")).toBeOnTheScreen();
    expect(screen.queryByTestId("empty-component-action")).toBeNull();
  });

  it("llama a onRetry al pulsar la accion", () => {
    const onRetry = jest.fn();
    render(<MenuEmpty onRetry={onRetry} />);

    fireEvent.press(screen.getByTestId("empty-component-action"));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("usa la etiqueta traducida de reintento", () => {
    render(<MenuEmpty onRetry={jest.fn()} />);

    expect(screen.getByText(es.common.retry)).toBeOnTheScreen();
  });

  it("muestra el titulo y la descripcion traducidos", () => {
    render(<MenuEmpty />);

    expect(screen.getByTestId("empty-component-title")).toHaveTextContent(
      es.empty.menu.title,
    );
    expect(screen.getByTestId("empty-component-description")).toHaveTextContent(
      es.empty.menu.description,
    );
  });
});
