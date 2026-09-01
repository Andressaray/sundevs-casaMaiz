import { waitFor } from "@testing-library/react-native";
import useCreateReservation from "@/features/reservation/hooks/useCreateReservation";
import { useReservationStore } from "@/features/reservation/store";
import { renderHookWithProviders } from "@tests/utils";
import { getApiMock, restoreApiMock } from "@tests/__mocks__/api.mock";
import type { ReservationFormData } from "@/features/reservation/types/reservation.types";

const INITIAL_STORE_STATE = useReservationStore.getState();

const formData: ReservationFormData = {
  name: "Ana Torres",
  phone: "+52 55 1234 5678",
  date: "2030-01-01",
};

describe("features/reservation/hooks / useCreateReservation", () => {
  afterEach(() => {
    useReservationStore.setState(INITIAL_STORE_STATE, true);
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("guarda el formulario en el store apenas se envia", async () => {
    getApiMock()
      .onPost("/reservations")
      .reply(201, {
        id: "res_1",
        ...formData,
        status: "pending",
        createdAt: "2026-09-01T00:00:00.000Z",
      });

    const { result } = renderHookWithProviders(() => useCreateReservation());

    result.current.createReservation(formData);

    await waitFor(() =>
      expect(useReservationStore.getState().reservation).toEqual(formData),
    );
    expect(useReservationStore.getState().status).not.toBe("idle");
  });

  it("marca el store como success cuando la peticion resuelve", async () => {
    getApiMock()
      .onPost("/reservations")
      .reply(201, {
        id: "res_1",
        ...formData,
        status: "pending",
        createdAt: "2026-09-01T00:00:00.000Z",
      });

    const { result } = renderHookWithProviders(() => useCreateReservation());

    result.current.createReservation(formData);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(useReservationStore.getState().status).toBe("success");
  });

  it("marca el store como error cuando el CMS falla", async () => {
    getApiMock().onPost("/reservations").reply(500, { error: "fail" });

    const { result } = renderHookWithProviders(() => useCreateReservation());

    result.current.createReservation(formData);

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(useReservationStore.getState().status).toBe("error");
  });
});
