module.exports = {
  forceExit: true,
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest'],
  },
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transformIgnorePatterns: [`<rootDir>/node_modules/.pnpm/(?!(d3-*))`],
  moduleNameMapper: {
    '@antv/g6': '<rootDir>/../g6/src',
  },
};
