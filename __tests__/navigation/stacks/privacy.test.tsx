import React from "react";
import { render } from "@testing-library/react-native";
import PrivacyStack, { PRIVACY_STACK } from "@/navigation/stacks/privacy";
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

describe("navigation/stacks / PrivacyStack", () => {
  beforeEach(() => {
    mockHomeSuccess();
    mockMenuSuccess();
  });

  afterAll(() => {
    restoreApiMock();
  });

  it("exporta PRIVACY_STACK constante", () => {
    expect(PRIVACY_STACK).toBe("LegalStack");
  });

  it("renderiza sin errores dentro de un NavigationContainer", () => {
    const { toJSON } = render(<PrivacyStack />, {
      wrapper: buildWrapper({ withNavigation: true }),
    });

    expect(toJSON()).toBeTruthy();
  });
});
