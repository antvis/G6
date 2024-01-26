module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:jsdoc/recommended-error'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['**/__tests__/**'],
      rules: {
        'jsdoc/require-jsdoc': 0,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jsdoc'],
  rules: {
    // indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    semi: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'jsdoc/require-param-type': 0,
    '@typescript-eslint/no-this-alias': 'off',

    // TODO: rules below will be set to 2 in the future
    'jsdoc/require-jsdoc': 1,
    'jsdoc/check-access': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/require-description': 1,
    'jsdoc/require-param': 1,
    'jsdoc/check-param-names': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-returns': 1,
    'jsdoc/require-returns-type': 0,
    'jsdoc/require-returns-description': 1,

    // TODO: rules below are not recommended, and will be removed in the future
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/ban-ts-comment': 1,
  },
};
