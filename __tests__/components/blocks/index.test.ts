import * as blocks from "@/components/blocks";

describe("components/blocks / barrel", () => {
  it("exporta todos los bloques soportados y el renderer", () => {
    expect(Object.keys(blocks).sort()).toEqual([
      "BlockRenderer",
      "CardGrid",
      "Carousel",
      "Hero",
      "ImageBlock",
      "PromoRail",
      "RestaurantCTA",
      "TextBlock",
    ]);
  });

  it("cada export es un componente", () => {
    Object.values(blocks).forEach((exported) => {
      expect(typeof exported).toBe("function");
    });
  });
});
