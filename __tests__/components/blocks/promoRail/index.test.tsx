import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import PromoRail from "@/components/blocks/promoRail";
import { buildPromoRailBlock } from "@tests/fixtures/blocks.fixture";

describe("components/blocks / PromoRail", () => {
  it("muestra el titulo y los datos de cada promocion", () => {
    render(<PromoRail block={buildPromoRailBlock()} onPress={jest.fn()} />);

    expect(screen.getByText("Promociones")).toBeOnTheScreen();
    expect(screen.getByText("Solo martes")).toBeOnTheScreen();
    expect(screen.getByText("2x1 en entradas")).toBeOnTheScreen();
    expect(screen.getByText("Valido de 13:00 a 17:00.")).toBeOnTheScreen();
  });

  it("navega con el path del destination al pulsar el CTA", () => {
    const onPress = jest.fn();
    render(<PromoRail block={buildPromoRailBlock()} onPress={onPress} />);

    fireEvent.press(screen.getByText("Ver condiciones"));

    expect(onPress).toHaveBeenCalledWith("/menu");
  });

  it("no navega cuando la promocion no trae destination", () => {
    const onPress = jest.fn();
    const block = buildPromoRailBlock();
    block.promotions[0].cta.destination = undefined as never;

    render(<PromoRail block={block} onPress={onPress} />);
    fireEvent.press(screen.getByText("Ver condiciones"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("renderiza sin promociones", () => {
    render(
      <PromoRail
        block={buildPromoRailBlock({ promotions: [] })}
        onPress={jest.fn()}
      />,
    );

    expect(screen.getByText("Promociones")).toBeOnTheScreen();
    expect(screen.queryByText("2x1 en entradas")).toBeNull();
  });
});
