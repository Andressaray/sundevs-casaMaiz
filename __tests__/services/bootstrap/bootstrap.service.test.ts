import BootstrapService from "@/services/bootstrap/bootstrap.service";
import {
  getApiMock,
  getLastRequest,
  restoreApiMock,
} from "@tests/__mocks__/api.mock";
import {
  mockBootstrapError,
  mockBootstrapSuccess,
} from "@tests/__mocks__/handlers.mock";
import { bootstrapFixture } from "@tests/fixtures/bootstrap.fixture";
import type { ApiRequest } from "@/types/types";

const request: ApiRequest = {
  platform: "ios",
  market: "MX",
  audience: "guest",
  appVersion: "1.0.1",
};

describe("services / BootstrapService", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("expone /bootstrap como baseUrl", () => {
    expect(new BootstrapService().baseUrl).toBe("/bootstrap");
  });

  it("devuelve response.data en el caso feliz", async () => {
    mockBootstrapSuccess();

    const result = await new BootstrapService().getBootstrapData(request);

    expect(result).toEqual(bootstrapFixture);
  });

  it("manda platform, market, audience y appVersion como params", async () => {
    mockBootstrapSuccess();

    await new BootstrapService().getBootstrapData(request);

    expect(getLastRequest().params).toEqual(request);
    expect(getLastRequest().url).toBe("/bootstrap");
  });

  it("propaga el error normalizado cuando el CMS falla", async () => {
    mockBootstrapError(503);

    await expect(
      new BootstrapService().getBootstrapData(request),
    ).rejects.toMatchObject({
      response: { status: 503, data: { error: "Internal Server Error" } },
    });
  });

  it("propaga los fallos de red", async () => {
    getApiMock().onGet("/bootstrap").networkError();

    await expect(
      new BootstrapService().getBootstrapData(request),
    ).rejects.toThrow();
  });
});
