const webpack = require('webpack');
const resolve = require('path').resolve;

module.exports = {
  entry: {
    g6: './src/index.ts',
  },
  output: {
    filename: '[name].min.js',
    library: 'G6',
    libraryTarget: 'umd',
    path: resolve(process.cwd(), 'dist/'),
  },
  resolve: {
    alias: {
      '@g6': resolve(process.cwd(), './src'),
      '@g6/types': resolve(process.cwd(), './types')
    },
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin(), new webpack.optimize.AggressiveMergingPlugin()],
  devtool: 'source-map',
};
