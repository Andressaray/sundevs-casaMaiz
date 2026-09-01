import type { HomeState } from "@/features/home/types/home.types";

describe("features/home/types / home.types", () => {
  it("exporta tipos sin errores", () => {
    const state: HomeState = {
      pages: [],
      error: null,
      isLoading: false,
    };
    expect(state).toBeDefined();
  });
});
