import React from "react";
import { render } from "@testing-library/react-native";
import ReservationStack, {
  RESERVATION_STACK,
} from "@/navigation/stacks/reservation";
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

describe("navigation/stacks / ReservationStack", () => {
  beforeEach(() => {
    mockHomeSuccess();
    mockMenuSuccess();
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("exporta RESERVATION_STACK constante", () => {
    expect(RESERVATION_STACK).toBe("ReservationStack");
  });

  it("renderiza sin errores dentro de un NavigationContainer", () => {
    const { toJSON } = render(<ReservationStack />, {
      wrapper: buildWrapper({ withNavigation: true }),
    });

    expect(toJSON()).toBeTruthy();
  });
});
