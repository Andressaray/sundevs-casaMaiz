import ReservationService from "@/features/reservation/services";
import { getApiMock, restoreApiMock } from "@tests/__mocks__/api.mock";
import type { ApiRequest } from "@/types/types";
import type { ReservationFormData } from "@/features/reservation/types/reservation.types";

const request: ApiRequest = {
  platform: "ios",
  market: "MX",
  audience: "guest",
  appVersion: "1.0.1",
};

const formData: ReservationFormData = {
  name: "Ana Torres",
  phone: "+52 55 1234 5678",
  date: "2030-01-01",
};

const responseFixture = {
  id: "res_1",
  name: formData.name,
  phone: formData.phone,
  date: formData.date,
  status: "pending",
  createdAt: "2026-09-01T00:00:00.000Z",
};

describe("features/reservation/services / ReservationService", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("expone /reservations como baseUrl", () => {
    expect(new ReservationService().baseUrl).toBe("/reservations");
  });

  it("devuelve response.data en el caso feliz", async () => {
    getApiMock().onPost("/reservations").reply(201, responseFixture);

    const result = await new ReservationService().createReservationService(
      formData,
      request,
    );

    expect(result).toEqual(responseFixture);
  });

  it("envia el formulario en el body y el contexto como params", async () => {
    getApiMock().onPost("/reservations").reply(201, responseFixture);

    await new ReservationService().createReservationService(formData, request);

    const lastRequest =
      getApiMock().history.post[getApiMock().history.post.length - 1];

    expect(JSON.parse(lastRequest.data)).toEqual(formData);
    expect(lastRequest.params).toEqual(request);
  });

  it("propaga el error normalizado cuando el servidor falla", async () => {
    getApiMock()
      .onPost("/reservations")
      .reply(500, { error: "Internal Server Error", errors: [] });

    await expect(
      new ReservationService().createReservationService(formData, request),
    ).rejects.toMatchObject({
      response: { status: 500, data: { error: "Internal Server Error" } },
    });
  });
});
