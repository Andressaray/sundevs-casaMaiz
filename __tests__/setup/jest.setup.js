jest.mock('react-native-safe-area-context', () => {
  const mock = require('react-native-safe-area-context/jest/mock');
  return mock.default || mock;
});

jest.mock('react-native-screens', () => {
  const actual = jest.requireActual('react-native-screens');
  return {
    ...actual,
    enableScreens: jest.fn(),
    enableFreeze: jest.fn(),
  };
});

jest.mock('@react-native-community/blur', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Passthrough = (props) =>
    React.createElement(View, props, props.children);
  return { BlurView: Passthrough, VibrancyView: Passthrough };
});

const IGNORED_WARNINGS = [
  'useNativeDriver',
  'Animated:',
  'VirtualizedList',
  'componentWillReceiveProps',
];

const IGNORED_ERRORS = ['not wrapped in act', 'An update to VirtualizedList'];

const originalWarn = console.warn;
console.warn = (...args) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (IGNORED_WARNINGS.some((ignored) => message.includes(ignored))) {
    return;
  }
  originalWarn(...args);
};

const originalError = console.error;
console.error = (...args) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (IGNORED_ERRORS.some((ignored) => message.includes(ignored))) {
    return;
  }
  originalError(...args);
};
