import { Animated } from "react-native";
import { cleanup, configure } from "@testing-library/react-native";
import { setLogger } from "react-query";
import { useAppStore } from "@/store";
import { resetApiMock } from "@tests/__mocks__/api.mock";

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

configure({
  asyncUtilTimeout: 5000,
  defaultIncludeHiddenElements: false,
});

const INITIAL_STORE_STATE = useAppStore.getState();

beforeEach(() => {
  jest.spyOn(Animated, "loop").mockImplementation(
    () =>
      ({
        start: jest.fn(),
        stop: jest.fn(),
        reset: jest.fn(),
      }) as never,
  );
});

afterEach(() => {
  cleanup();
  resetApiMock();
  useAppStore.setState(INITIAL_STORE_STATE, true);
  jest.clearAllMocks();
});
