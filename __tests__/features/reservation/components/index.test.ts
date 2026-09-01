import {
  ReservationEmpty,
  ReservationForm,
} from "@/features/reservation/components";

describe("features/reservation/components / index exports", () => {
  it("exporta ReservationEmpty", () => {
    expect(ReservationEmpty).toBeDefined();
  });

  it("exporta ReservationForm", () => {
    expect(ReservationForm).toBeDefined();
  });
});
