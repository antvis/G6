module.exports = {
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest'],
  },
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transformIgnorePatterns: [`<rootDir>/node_modules/.pnpm/(?!(d3-*))`],
};
