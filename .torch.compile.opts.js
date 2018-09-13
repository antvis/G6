module.exports = {
  babelrc: {
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      'transform-remove-strict-mode',
      [
        "module-resolver",
        {
          "alias": {
            '@antv/g6': './src/index'
          },
        }
      ],
    ],
    presets: [
      "@babel/preset-env",
    ],
    sourceMaps: 'inline',
  },
  extensions: ['.js'],
  include: [
    'src/**/*.js',
    'plugins/**/*.js',
  ],
  exclude: /(node_modules|bower_components)/
}
