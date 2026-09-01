import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import ErrorFallback from "@/components/ui/ErrorFallback";
import es from "@/config/languages/es.json";

describe("components/ui / ErrorFallback", () => {
  it("usa los textos por defecto traducidos", () => {
    render(<ErrorFallback />);

    expect(screen.getByText(es.errors.general_error)).toBeOnTheScreen();
    expect(screen.getByText(es.errors.load_content_error)).toBeOnTheScreen();
  });

  it("respeta las claves de traduccion recibidas por props", () => {
    render(
      <ErrorFallback
        titleKey="errors.connection_error"
        messageKey="errors.load_menu_error"
      />,
    );

    expect(screen.getByText(es.errors.connection_error)).toBeOnTheScreen();
    expect(screen.getByText(es.errors.load_menu_error)).toBeOnTheScreen();
  });

  it("los textos literales tienen prioridad sobre las claves", () => {
    render(<ErrorFallback title="Titulo directo" message="Mensaje directo" />);

    expect(screen.getByText("Titulo directo")).toBeOnTheScreen();
    expect(screen.getByText("Mensaje directo")).toBeOnTheScreen();
  });

  it("no muestra boton de reintento si no hay onRetry", () => {
    render(<ErrorFallback />);

    expect(screen.queryByText(es.common.retry)).toBeNull();
  });

  it("llama a onRetry al pulsar el boton", () => {
    const onRetry = jest.fn();
    render(<ErrorFallback onRetry={onRetry} />);

    fireEvent.press(screen.getByText(es.common.retry));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("oculta los detalles del error por defecto", () => {
    render(<ErrorFallback error={new Error("stack interno")} />);

    expect(screen.queryByText("stack interno")).toBeNull();
  });

  it("muestra los detalles cuando showDetails es true", () => {
    render(<ErrorFallback error={new Error("stack interno")} showDetails />);

    expect(screen.getByText("stack interno")).toBeOnTheScreen();
    expect(screen.getByText(es.errors.details)).toBeOnTheScreen();
  });

  it("acepta el error como string", () => {
    render(<ErrorFallback error="fallo de red" showDetails />);

    expect(screen.getByText("fallo de red")).toBeOnTheScreen();
  });

  it("siempre muestra el bloque de sugerencias", () => {
    render(<ErrorFallback />);

    expect(
      screen.getByText(es.errorFallback.suggestions_title),
    ).toBeOnTheScreen();
    expect(
      screen.getByText(es.errorFallback.check_connection),
    ).toBeOnTheScreen();
  });
});
