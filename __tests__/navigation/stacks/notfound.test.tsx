import React from "react";
import { render } from "@testing-library/react-native";
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

describe("navigation/stacks / NotFoundStack", () => {
  beforeEach(() => {
    mockHomeSuccess();
    mockMenuSuccess();
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("exporta NOT_FOUND_STACK constante", () => {
    expect(NOT_FOUND_STACK).toBe("NotFoundStack");
  });

  it("renderiza sin errores dentro de un NavigationContainer", () => {
    const { toJSON } = render(<NotFoundStack />, {
      wrapper: buildWrapper({ withNavigation: true }),
    });

    expect(toJSON()).toBeTruthy();
  });
});
