module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/eslint')],
    globals: {
      $: true,
      _: true,
    },
    rules: {
      'no-bitwise': 0,
      'import/order': 0,
      'no-plusplus': 0,
      'operator-assignment': 0,
      'consistent-return': 0,
      'lines-between-class-members': 0,
      'class-methods-use-this': 0,
      'lines-between-class-members': 0,
      'no-multi-assign': 0,
      'no-continue': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'no-underscore-dangle': 0,
      'no-useless-constructor': 0,
      'prefer-destructuring': 0,
      // 后面需要去掉
      'no-restricted-syntax': 0,
      'prefer-spread': 0,
      '@typescript-eslint/camelcase': 0,
      'no-loop-func': 0
    },
  };