import React from "react";
import { render } from "@testing-library/react-native";
import HomeIcon from "@/ui/icons/homeIcon";
import MenuIcon from "@/ui/icons/menuIcon";
import PrivacyIcon from "@/ui/icons/privacyIcon";
import ReservationIcon from "@/ui/icons/reservationIcon";

const icons = [
  ["HomeIcon", HomeIcon],
  ["MenuIcon", MenuIcon],
  ["PrivacyIcon", PrivacyIcon],
  ["ReservationIcon", ReservationIcon],
] as const;

describe("ui/icons", () => {
  it.each(icons)("%s renderiza sin errores", (_name, Icon) => {
    const { toJSON } = render(<Icon />);

    expect(toJSON()).toBeTruthy();
  });

  it.each(icons)("%s acepta width, height y color", (_name, Icon) => {
    const { toJSON } = render(<Icon width={32} height={32} color="#FF0000" />);

    expect(JSON.stringify(toJSON())).toContain("#FF0000");
  });
});
