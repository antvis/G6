// Installing third-party modules by tnpm or cnpm will name modules with underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['internmap', 'd3-*', 'lodash-es'].map((d) => `_${d}|${d}`).join('|');

module.exports = {
  testTimeout: 100000,
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        diagnostics: {
          exclude: ['**'],
        },
        tsconfig: {
          allowJs: true,
          target: 'esnext',
          esModuleInterop: true,
        },
      },
    ],
  },
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: false,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js)$',
  // Transform esm to cjs.
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esm}))`],
  testPathIgnorePatterns: ['/(lib|esm)/__tests__/'],
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/__tests__/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
};
