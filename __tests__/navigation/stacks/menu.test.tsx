import React from "react";
import { render } from "@testing-library/react-native";
import MenuStack, { MENU_STACK } from "@/navigation/stacks/menu";
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

describe("navigation/stacks / MenuStack", () => {
  beforeEach(() => {
    mockHomeSuccess();
    mockMenuSuccess();
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("exporta MENU_STACK constante", () => {
    expect(MENU_STACK).toBe("MenuStack");
  });

  it("renderiza sin errores dentro de un NavigationContainer", () => {
    const { toJSON } = render(<MenuStack />, {
      wrapper: buildWrapper({ withNavigation: true }),
    });

    expect(toJSON()).toBeTruthy();
  });
});
