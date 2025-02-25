// Installing third-party modules by tnpm or cnpm will name modules with underscore as prefix.
// In this case _{module} is also necessary.
const esm = ['internmap', 'd3-*', 'lodash-es', 'chalk'].map((d) => `_${d}|${d}`).join('|');

module.exports = {
  testTimeout: 100000,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./__tests__/setup.ts'],
  transform: {
    '^.+\\.[tj]s$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
        },
      },
    ],
    '^.+\\.svg$': ['<rootDir>/__tests__/utils/svg-transformer.js'],
  },
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/src/elements/nodes/html.ts', '<rootDir>/src/plugins/minimap', '<rootDir>/src/plugins/hull/(?!index\\.ts$).*'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverage: true,
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: [`<rootDir>/node_modules/.pnpm/(?!(${esm}))`],
  testPathIgnorePatterns: ['/(lib|esm)/__tests__/'],
  moduleNameMapper: {
    '^@@/(.*)$': '<rootDir>/__tests__/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '@antv/g6': '<rootDir>/src',
  },
};
