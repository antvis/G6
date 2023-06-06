const webpack = require('webpack');
const resolve = require('path').resolve;
const shelljs = require('shelljs');
const _ = require('lodash');
const pkg = require('./package.json');

const entry = {
  G6: './src/index.js',
  G6Plugins: './plugins/index.js'
};

shelljs.ls(resolve(__dirname, 'plugins')).forEach(pluginPath => {
  if (pluginPath !== 'index.js') {
    const moduleName = _.upperFirst(_.camelCase(pluginPath));
    entry[moduleName] = `./plugins/${pluginPath}/index.js`;
  }
});

module.exports = {
  mode: 'production',
  devtool: 'cheap-source-map',
  entry,
  output: {
    filename: substitutions => `${_.lowerFirst(substitutions.chunk.name)}.js`,
    library: '[name]',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'build/')
  },
  externals: {
    '@antv/g6': 'G6'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /global\.js$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: '____G6_VERSION____',
            replace: pkg.version
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
