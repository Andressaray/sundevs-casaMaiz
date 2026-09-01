import { useReservationStore } from "@/features/reservation/store";

const INITIAL_STATE = useReservationStore.getState();

describe("features/reservation/store / useReservationStore", () => {
  afterEach(() => {
    useReservationStore.setState(INITIAL_STATE, true);
  });

  it("arranca sin reserva y con estado idle", () => {
    const { reservation, status } = useReservationStore.getState();

    expect(reservation).toBeNull();
    expect(status).toBe("idle");
  });

  it("setReservation guarda la informacion del formulario", () => {
    const data = {
      name: "Ana Torres",
      phone: "+52 55 1234 5678",
      date: "2030-01-01",
    };

    useReservationStore.getState().setReservation(data);

    expect(useReservationStore.getState().reservation).toEqual(data);
  });

  it("setStatus cambia el estado de envio", () => {
    useReservationStore.getState().setStatus("submitting");

    expect(useReservationStore.getState().status).toBe("submitting");
  });

  it("resetReservation limpia la reserva y el estado", () => {
    useReservationStore
      .getState()
      .setReservation({ name: "Ana Torres", phone: "555", date: "2030-01-01" });
    useReservationStore.getState().setStatus("success");

    useReservationStore.getState().resetReservation();

    expect(useReservationStore.getState().reservation).toBeNull();
    expect(useReservationStore.getState().status).toBe("idle");
  });
});
