module.exports = {
  babelrc: {
    plugins: [
      'transform-object-rest-spread',
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
      [
        'env',
        {
          'loose': true,
          'modules': false
        }
      ]
    ],
    sourceMaps: 'inline',
  },
  extensions: ['.js'],
  include: [
    'src/**/*.js',
    'plugins/**/*.js',
    'node_modules/**/src/gl-matrix/**/*.js '
  ],
  exclude: [
    'bower_components/**/*.js',
  ]
}