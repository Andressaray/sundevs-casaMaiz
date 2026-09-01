import React from "react";
import { render } from "@testing-library/react-native";
import HomeStack, { HOME_STACK } from "@/navigation/stacks/home";
import MenuStack, { MENU_STACK } from "@/navigation/stacks/menu";
import PrivacyStack, { PRIVACY_STACK } from "@/navigation/stacks/privacy";
import ReservationStack, {
  RESERVATION_STACK,
} from "@/navigation/stacks/reservation";
import NotFoundStack, { NOT_FOUND_STACK } from "@/navigation/stacks/notfound";
import { buildWrapper } from "@tests/utils";
import {
  mockHomeSuccess,
  mockMenuSuccess,
} from "@tests/__mocks__/handlers.mock";
import { restoreApiMock } from "@tests/__mocks__/api.mock";

jest.mock("@/navigation", () => ({
  __esModule: true,
  default: () => null,
  ROUTES: {},
}));

describe("navigation/stacks", () => {
  afterAll(() => {
    restoreApiMock();
  });

  it("cada stack exporta un nombre unico y estable", () => {
    const names = [
      HOME_STACK,
      MENU_STACK,
      PRIVACY_STACK,
      RESERVATION_STACK,
      NOT_FOUND_STACK,
    ];

    expect(names).toEqual([
      "HomeStack",
      "MenuStack",
      "LegalStack",
      "ReservationStack",
      "NotFoundStack",
    ]);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each([
    ["HomeStack", HomeStack],
    ["MenuStack", MenuStack],
    ["PrivacyStack", PrivacyStack],
    ["ReservationStack", ReservationStack],
    ["NotFoundStack", NotFoundStack],
  ])("%s monta sin errores", (_name, Stack) => {
    mockHomeSuccess();
    mockMenuSuccess();

    const { toJSON } = render(<Stack />, {
      wrapper: buildWrapper({ withNavigation: true }),
    });

    expect(toJSON()).toBeTruthy();
  });
});
