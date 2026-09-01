import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import Hero from "@/components/blocks/hero";
import { buildHeroBlock } from "@tests/fixtures/blocks.fixture";

describe("components/blocks / Hero", () => {
  it("muestra eyebrow, headline y descripcion del CMS", () => {
    render(<Hero block={buildHeroBlock()} onPress={jest.fn()} />);

    expect(screen.getByText("Cocina de maiz")).toBeOnTheScreen();
    expect(screen.getByText("Bienvenido a Casa Maiz")).toBeOnTheScreen();
    expect(
      screen.getByText("Sabores tradicionales con producto de temporada."),
    ).toBeOnTheScreen();
  });

  it("oculta eyebrow y descripcion cuando el CMS no los envia", () => {
    render(
      <Hero
        block={buildHeroBlock({ eyebrow: "", description: "" })}
        onPress={jest.fn()}
      />,
    );

    expect(screen.queryByText("Cocina de maiz")).toBeNull();
    expect(screen.getByText("Bienvenido a Casa Maiz")).toBeOnTheScreen();
  });

  it("renderiza un boton por cada action", () => {
    render(<Hero block={buildHeroBlock()} onPress={jest.fn()} />);

    expect(screen.getByText("Ver menu")).toBeOnTheScreen();
    expect(screen.getByText("Reservar")).toBeOnTheScreen();
  });

  it("propaga el href de la action pulsada", () => {
    const onPress = jest.fn();
    render(<Hero block={buildHeroBlock()} onPress={onPress} />);

    fireEvent.press(screen.getByText("Ver menu"));

    expect(onPress).toHaveBeenCalledWith("/menu");
  });

  it("no renderiza botonera cuando no hay actions", () => {
    const onPress = jest.fn();
    render(<Hero block={buildHeroBlock({ actions: [] })} onPress={onPress} />);

    expect(screen.queryByText("Ver menu")).toBeNull();
  });

  it("no rompe cuando la imagen no trae url", () => {
    expect(() =>
      render(
        <Hero
          block={buildHeroBlock({ image: undefined as never })}
          onPress={jest.fn()}
        />,
      ),
    ).not.toThrow();
  });
});
