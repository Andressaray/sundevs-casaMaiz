import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import RestaurantCTA from "@/components/blocks/restaurantCTA";
import { buildRestaurantCTABlock } from "@tests/fixtures/blocks.fixture";

describe("components/blocks / RestaurantCTA", () => {
  it("muestra headline, descripcion y label del boton", () => {
    render(
      <RestaurantCTA block={buildRestaurantCTABlock()} onPress={jest.fn()} />,
    );

    expect(screen.getByText("Reserva tu mesa")).toBeOnTheScreen();
    expect(
      screen.getByText("Disponibilidad limitada los fines de semana."),
    ).toBeOnTheScreen();
    expect(screen.getByText("Reservar ahora")).toBeOnTheScreen();
  });

  it("propaga el href del bloque al pulsar", () => {
    const onPress = jest.fn();
    render(
      <RestaurantCTA block={buildRestaurantCTABlock()} onPress={onPress} />,
    );

    fireEvent.press(screen.getByText("Reservar ahora"));

    expect(onPress).toHaveBeenCalledWith("/reservas");
  });

  it("respeta el href que envia el CMS", () => {
    const onPress = jest.fn();
    render(
      <RestaurantCTA
        block={buildRestaurantCTABlock({ href: "/menu" })}
        onPress={onPress}
      />,
    );

    fireEvent.press(screen.getByText("Reservar ahora"));

    expect(onPress).toHaveBeenCalledWith("/menu");
  });
});
