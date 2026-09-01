import React from "react";
import { render } from "@testing-library/react-native";
import ReservationIcon from "@/ui/icons/reservationIcon";

describe("ui/icons / ReservationIcon", () => {
  it("renderiza sin errors", () => {
    const { toJSON } = render(<ReservationIcon />);
    expect(toJSON()).toBeDefined();
  });

  it("acepta props de tamaño personalizado", () => {
    const { toJSON } = render(<ReservationIcon size={32} />);
    expect(toJSON()).toBeDefined();
  });
});
