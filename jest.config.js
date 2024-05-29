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
  collectCoverageFrom: ['<rootDir>/packages/g6/src/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/packages/g6/src/elements/nodes/html.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: true,
  testMatch: ['<rootDir>/__tests__/**/*.(test|spec).ts'],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(?:.pnpm/)?(${esm}))`],
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/__tests__/$1',
    '^@g6/(.*)$': '<rootDir>/packages/g6/src/$1',
    '@antv/g6': '<rootDir>/packages/g6/src',
  },
};
