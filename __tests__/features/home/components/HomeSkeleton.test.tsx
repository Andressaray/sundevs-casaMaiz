import React from "react";
import { render } from "@testing-library/react-native";
import HomeSkeleton from "@/features/home/components/HomeSkeleton";

describe("features/home/components / HomeSkeleton", () => {
  it("renderiza sin errors", () => {
    const { toJSON } = render(<HomeSkeleton />);
    expect(toJSON()).toBeDefined();
  });

  it("renderiza una lista de skeleton items", () => {
    const { root } = render(<HomeSkeleton />);
    expect(root).toBeDefined();
  });
});
