// Installing third-party modules by tnpm or cnpm will name modules with underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['internmap', 'd3-*', 'lodash-es', 'chalk'].map((d) => `_${d}|${d}`).join('|');

module.exports = {
  testTimeout: 100000,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest'],
    '^.+\\.svg$': ['<rootDir>/__tests__/utils/svg-transformer.js'],
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
