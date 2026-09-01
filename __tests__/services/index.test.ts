import { api } from "@services/index";
import { getApiMock, restoreApiMock } from "@tests/__mocks__/api.mock";

describe("services / instancia de axios", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("apunta al baseURL del CMS", () => {
    expect(api.defaults.baseURL).toBe(
      "https://payload-cms-poc-seven.vercel.app/api/content/v1/",
    );
  });

  it("tiene timeout de 10 segundos", () => {
    expect(api.defaults.timeout).toBe(10_000);
  });

  it("envia Content-Type application/json", () => {
    expect(api.defaults.headers["Content-Type"]).toBe("application/json");
  });

  describe("interceptor de respuesta", () => {
    it("deja pasar las respuestas exitosas sin tocarlas", async () => {
      getApiMock().onGet("/ping").reply(200, { ok: true });

      const response = await api.get("/ping");

      expect(response.status).toBe(200);
      expect(response.data).toEqual({ ok: true });
    });

    it("normaliza el error del CMS a { error, errors }", async () => {
      getApiMock()
        .onGet("/broken")
        .reply(422, {
          error: "Validation failed",
          errors: [{ field: "slug" }],
        });

      await expect(api.get("/broken")).rejects.toMatchObject({
        response: {
          status: 422,
          data: {
            error: "Validation failed",
            errors: [{ field: "slug" }],
          },
        },
      });
    });

    it("rellena valores por defecto cuando el backend no los manda", async () => {
      getApiMock().onGet("/partial").reply(500, { detail: "boom" });

      await expect(api.get("/partial")).rejects.toMatchObject({
        response: {
          data: { error: "Error desconocido", errors: [] },
        },
      });
    });

    it("propaga errores de red sin response", async () => {
      getApiMock().onGet("/offline").networkError();

      await expect(api.get("/offline")).rejects.toThrow();
    });

    it("propaga el 401 sin romper", async () => {
      getApiMock().onGet("/unauthorized").reply(401, { error: "Unauthorized" });

      await expect(api.get("/unauthorized")).rejects.toMatchObject({
        response: { status: 401 },
      });
    });
  });
});
