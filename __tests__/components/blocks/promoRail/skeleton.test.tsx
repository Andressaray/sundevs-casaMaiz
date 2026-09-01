import React from "react";
import { render } from "@testing-library/react-native";
import PromoRailSkeleton from "@/components/blocks/promoRail/skeleton";

describe("components/blocks/promoRail / PromoRailSkeleton", () => {
  it("renderiza sin errors", () => {
    const { toJSON } = render(<PromoRailSkeleton />);
    expect(toJSON()).toBeDefined();
  });

  it("renderiza el contenedor principal", () => {
    const { root } = render(<PromoRailSkeleton />);
    expect(root).toBeDefined();
  });
});
