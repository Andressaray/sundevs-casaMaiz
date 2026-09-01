const reactNativePreset = require("@react-native/jest-preset");

module.exports = {
  ...reactNativePreset,

  rootDir: ".",

  setupFiles: [
    ...(reactNativePreset.setupFiles || []),
    "<rootDir>/__tests__/setup/jest.setup.js",
  ],

  setupFilesAfterEnv: ["<rootDir>/__tests__/setup/setupAfterEnv.tsx"],

  testMatch: ["<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}"],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  moduleNameMapper: {
    "^@/components/blocks/skeletons$":
      "<rootDir>/__tests__/__mocks__/missing/skeletons.tsx",
    "^@components/skeletons$":
      "<rootDir>/__tests__/__mocks__/missing/skeletons.tsx",

    "(.*)/components/skeletons$":
      "<rootDir>/__tests__/__mocks__/missing/skeletons.tsx",
    "(.*)/EmptyComponent$":
      "<rootDir>/__tests__/__mocks__/missing/EmptyComponent.tsx",

    "^\\.\\./components$": "<rootDir>/src/features/home/components/index.ts",

    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@/features/(.*)$": "<rootDir>/src/features/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@navigation/(.*)$": "<rootDir>/src/navigation/$1",
    "^@screens/(.*)$": "<rootDir>/src/screens/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@/(.*)$": "<rootDir>/src/$1",

    "^@tests/(.*)$": "<rootDir>/__tests__/$1",

    ...(reactNativePreset.moduleNameMapper || {}),
  },

  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-async-storage|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-svg|react-native-gesture-handler)/)",
  ],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/types/**",
    "!src/config/languages/**",
    "!src/components/example.tsx",
    "!src/components/glasscomponents.tsx",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text-summary", "lcov"],

  clearMocks: true,
  resetMocks: false,
  restoreMocks: true,
  testTimeout: 15000,
};
