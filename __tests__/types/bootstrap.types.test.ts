import type { Bootstrap } from "@/types/bootstrap.types";

describe("types / bootstrap.types", () => {
  it("exporta tipos sin errores", () => {
    const bootstrap: Bootstrap = {
      pages: [],
      navigation: {
        navigationItems: [],
      },
    };
    expect(bootstrap).toBeDefined();
  });
});
