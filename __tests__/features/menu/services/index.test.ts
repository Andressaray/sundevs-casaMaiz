import MenuService from "@/features/menu/services";
import { getLastRequest, restoreApiMock } from "@tests/__mocks__/api.mock";
import { mockGetError, mockMenuSuccess } from "@tests/__mocks__/handlers.mock";
import { menuPageFixture } from "@tests/fixtures/page.fixture";
import type { ApiRequest } from "@/types/types";

const request: ApiRequest = {
  platform: "android",
  market: "MX",
  audience: "guest",
  appVersion: "1.0.1",
};

describe("features/menu / MenuService", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("apunta a /pages/menu", () => {
    expect(new MenuService().baseUrl).toBe("/pages/menu");
  });

  it("devuelve el layout del menu", async () => {
    mockMenuSuccess();

    const result = await new MenuService().getMenuService(request);

    expect(result).toEqual(menuPageFixture);
    expect(result.data.slug).toBe("menu");
  });

  it("envia el contexto de request como params", async () => {
    mockMenuSuccess();

    await new MenuService().getMenuService(request);

    expect(getLastRequest().params).toEqual(request);
  });

  it("propaga el error del CMS", async () => {
    mockGetError("/pages/menu", 404, { error: "Not found", errors: [] });

    await expect(
      new MenuService().getMenuService(request),
    ).rejects.toMatchObject({
      response: { status: 404, data: { error: "Not found" } },
    });
  });
});
