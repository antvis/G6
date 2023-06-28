module.exports = {
  runner: '@kayahr/jest-electron-runner',
  testEnvironment: '@kayahr/jest-electron-runner/environment',
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  testRegex: '/tests/.*-spec\\.ts?$',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  moduleNameMapper: {
    '@g6/types': '<rootDir>/src/types',
    '@g6/(.*)': '<rootDir>/src/$1',
    '^d3-(.*)$': '<rootDir>/../../node_modules/d3-$1/dist/d3-$1.min.js',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  testTimeout: 450000,
};
