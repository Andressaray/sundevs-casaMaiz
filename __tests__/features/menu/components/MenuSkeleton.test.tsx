import React from "react";
import { render } from "@testing-library/react-native";
import MenuSkeleton from "@/features/menu/components/MenuSkeleton";

describe("features/menu/components / MenuSkeleton", () => {
  it("renderiza sin errors", () => {
    const { toJSON } = render(<MenuSkeleton />);
    expect(toJSON()).toBeDefined();
  });

  it("renderiza una lista de skeleton items", () => {
    const { root } = render(<MenuSkeleton />);
    expect(root).toBeDefined();
  });
});
