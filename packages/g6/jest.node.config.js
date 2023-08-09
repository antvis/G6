// Installing third-party modules by tnpm or cnpm will name modules with underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['internmap', 'd3-*', 'lodash-es']
  .map((d) => `_${d}|${d}`)
  .join('|');

module.exports = {
  testEnvironment: 'jsdom',
  testTimeout: 100000,
  preset: 'ts-jest/presets/js-with-ts',
  globals: {
    'ts-jest': {
      diagnostics: {
        exclude: ['**'],
      },
      tsconfig: {
        target: 'esnext', // Increase test coverage.
        allowJs: true,
        sourceMap: true,
      },
    },
  },
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: false,
  testRegex: '(/tests/.*\\.(test|spec))\\.(ts|tsx|js)$',
  // Transform esm to cjs.
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esm}))`],
};
