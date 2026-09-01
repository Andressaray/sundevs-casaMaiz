/* eslint-disable max-nested-callbacks */
import React from "react";
import { render, screen } from "@testing-library/react-native";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import {
  buildCardGridBlock,
  buildCarouselBlock,
  buildFullLayout,
  buildHeroBlock,
  buildImageBlock,
  buildPromoRailBlock,
  buildRestaurantCTABlock,
  buildTextBlock,
  unknownBlockFixture,
} from "@tests/fixtures/blocks.fixture";
import type { LayoutBlock } from "@/types/page.types";

const renderBlock = (block: LayoutBlock, onNavigate = jest.fn()) =>
  render(<BlockRenderer block={block} onNavigate={onNavigate} />);

describe("components/blocks / BlockRenderer", () => {
  it.each`
    nombre              | block                        | textoVisible
    ${"restaurantHero"} | ${buildHeroBlock()}          | ${"Bienvenido a Casa Maiz"}
    ${"cardGrid"}       | ${buildCardGridBlock()}      | ${"Platos destacados"}
    ${"carousel"}       | ${buildCarouselBlock()}      | ${"El restaurante"}
    ${"promoRail"}      | ${buildPromoRailBlock()}     | ${"Promociones"}
    ${"textBlock"}      | ${buildTextBlock()}          | ${"Del comal a la mesa"}
    ${"restaurantCTA"}  | ${buildRestaurantCTABlock()} | ${"Reserva tu mesa"}
  `("renderiza el bloque $nombre", ({ block, textoVisible }) => {
    renderBlock(block);

    expect(screen.getByText(textoVisible)).toBeOnTheScreen();
  });

  it("renderiza imageBlock (sin texto obligatorio) sin romper", () => {
    renderBlock(buildImageBlock());

    expect(screen.getByText("Nuestro comal de barro")).toBeOnTheScreen();
  });

  it("no rompe con un blockType desconocido y avisa por consola", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

    const { toJSON } = renderBlock(unknownBlockFixture);

    expect(toJSON()).toBeTruthy();
    expect(warn).toHaveBeenCalledWith("Unknown block type: formBlock");
  });

  it("no rompe cuando el bloque es null", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

    const { toJSON } = renderBlock(null as unknown as LayoutBlock);

    expect(toJSON()).toBeTruthy();
    expect(warn).toHaveBeenCalledWith("BlockRenderer received null block");
  });

  it("renderiza el layout completo del CMS sin excepciones", () => {
    buildFullLayout().forEach((block) => {
      expect(() => renderBlock(block).unmount()).not.toThrow();
    });
  });

  it("tolera los blockTypes del contrato que aun no tienen componente", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    const pendientes = ["cta", "content", "mediaBlock", "archive", "formBlock"];

    pendientes.forEach((blockType) => {
      const block = { blockType, id: blockType } as unknown as LayoutBlock;
      expect(() => renderBlock(block).unmount()).not.toThrow();
    });

    expect(warn).toHaveBeenCalledTimes(pendientes.length);
  });
});
