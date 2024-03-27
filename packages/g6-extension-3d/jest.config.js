module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
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
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js)$',
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
