module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    $: true,
    _: true,
  },
  rules: {
    'no-bitwise': 0,
  },
};
