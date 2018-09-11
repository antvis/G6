const webpack = require('webpack');
const resolve = require('path').resolve;
const shelljs = require('shelljs');
const _ = require('lodash');

const entry = {
  G6: './src/index.js',
  G6Plugins: './plugins/index.js'
};

shelljs.ls(resolve(__dirname, 'plugins')).forEach(pluginPath => {
  if (pluginPath !== 'index.js') {
    const moduleName = 'plugin.' + pluginPath;
    entry[moduleName] = `./plugins/${pluginPath}/index.js`;
  } else {
    const moduleName = 'plugins';
    entry[moduleName] = './plugins/index.js';
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
    '@antv/g6': {
      root: 'G6',
      commonjs2: '@antv/g6',
      commonjs: '@antv/g6',
      amd: '@antv/g6'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.worker.js$/,
        loader: 'worker-loader',
        options: {
          inline: true
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
