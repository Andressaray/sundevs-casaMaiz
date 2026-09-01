import React from "react";
import { render } from "@testing-library/react-native";
import HeroSkeleton from "@/components/blocks/hero/skeleton";

describe("components/blocks/hero / HeroSkeleton", () => {
  it("renderiza sin errors", () => {
    const { toJSON } = render(<HeroSkeleton />);
    expect(toJSON()).toBeDefined();
  });

  it("renderiza el contenedor principal", () => {
    const { root } = render(<HeroSkeleton />);
    expect(root).toBeDefined();
  });
});
