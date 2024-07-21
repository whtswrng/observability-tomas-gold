module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Ensure jsdom is installed
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json' // Point to the test-specific tsconfig
    }
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFiles: ['./jest.polyfill.js'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'], // Setup file for tests
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mock styles (if needed)
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest' // Transform TypeScript files
  },
  testMatch: ['**/?(*.)+(test).ts?(x)'], // Match test files
};
