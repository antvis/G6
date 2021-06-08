module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**', '!**/vendor/**'],
  testRegex: '/tests/.*-spec\\.ts?$',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: {
    '@g6/types': '<rootDir>/types',
    '@g6/(.*)': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
