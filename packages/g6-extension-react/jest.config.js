const esm = ['internmap', 'd3-*', 'lodash-es', 'chalk'].map((d) => `_${d}|${d}`).join('|');

module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
            jsx: true,
          },
        },
      },
    ],
  },
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transformIgnorePatterns: [`<rootDir>/node_modules/.pnpm/(?!(${esm}))`],
  moduleNameMapper: {
    '@antv/g6': '<rootDir>/../g6/src',
  },
};
