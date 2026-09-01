export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();
export const mockReset = jest.fn();
export const mockSetOptions = jest.fn();
export const mockAddListener = jest.fn(() => jest.fn());
export const mockCanGoBack = jest.fn(() => true);

export const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
  reset: mockReset,
  setOptions: mockSetOptions,
  addListener: mockAddListener,
  canGoBack: mockCanGoBack,
  dispatch: jest.fn(),
  isFocused: jest.fn(() => true),
};

export const resetNavigationMocks = (): void => {
  mockNavigate.mockClear();
  mockGoBack.mockClear();
  mockReset.mockClear();
  mockSetOptions.mockClear();
  mockAddListener.mockClear();
};

export const navigationMockFactory = () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useNavigation: () => mockNavigation,
    useRoute: () => ({ key: "test-route", name: "TestScreen", params: {} }),
    useIsFocused: () => true,
    useFocusEffect: (callback: () => void) => callback(),
  };
};
