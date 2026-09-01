import React from "react";
import { render } from "@testing-library/react-native";
import TextBlockSkeleton from "@/components/blocks/textBlock/skeleton";

describe("components/blocks/textBlock / TextBlockSkeleton", () => {
  it("renderiza sin errors", () => {
    const { toJSON } = render(<TextBlockSkeleton />);
    expect(toJSON()).toBeDefined();
  });

  it("renderiza el contenedor principal", () => {
    const { root } = render(<TextBlockSkeleton />);
    expect(root).toBeDefined();
  });
});
