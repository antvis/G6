const webpack = require('webpack');
// eslint-disable-next-line prefer-destructuring
const resolve = require('path').resolve;

module.exports = {
  entry: {
    g6: './src/index.ts',
  },
  output: {
    filename: '[name].min.js',
    library: 'G6',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: resolve(process.cwd(), 'dist/'),
  },
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              inline: true,
              fallback: false,
              name: 'g6Layout.worker.js',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // babelrc: true,
            presets: ['@babel/preset-env'],
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
