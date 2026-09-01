import React from "react";
import { render } from "@testing-library/react-native";
import HomeStack, { HOME_STACK } from "@/navigation/stacks/home";
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

describe("navigation/stacks / HomeStack", () => {
  beforeEach(() => {
    mockHomeSuccess();
    mockMenuSuccess();
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("exporta HOME_STACK constante", () => {
    expect(HOME_STACK).toBe("HomeStack");
  });

  it("renderiza sin errores dentro de un NavigationContainer", () => {
    const { toJSON } = render(<HomeStack />, {
      wrapper: buildWrapper({ withNavigation: true }),
    });

    expect(toJSON()).toBeTruthy();
  });
});
