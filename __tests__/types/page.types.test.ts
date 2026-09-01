import type { PageData } from "@/types/page.types";

describe("types / page.types", () => {
  it("exporta tipos sin errores", () => {
    const pageData: PageData = {
      id: "test",
      indexable: true,
      layout: [],
      meta: {
        title: "Test",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: {} as any,
        description: "Test description",
      },
      slug: "test-page",
      title: "Test Page",
      updatedAt: "2023-01-01",
      resolvedContext: {
        appVersion: "1.0.0",
        authenticationState: "authenticated",
        market: "US",
        now: "2023-01-01",
        platform: "web",
      },
      preview: false,
      nextChangeAt: "2023-01-02",
    };
    expect(pageData).toBeDefined();
  });
});
