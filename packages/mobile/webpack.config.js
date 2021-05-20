const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');
// eslint-disable-next-line prefer-destructuring
const resolve = require('path').resolve;
// eslint-disable-next-line prefer-destructuring

let entry = {
  g6: './src/index.ts',
};

const extenders = fs.readdirSync(path.join(__dirname, './src/extends'));
extenders.forEach((name) => {
  entry[name] = `./src/extends/${name}/index.ts`;
})

module.exports = {
  entry,
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'g6' ? '[name].min.js' : 'extends/[name].min.js';
    },
    library: 'G6',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: resolve(process.cwd(), 'dist/'),
    globalObject: 'this',
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
              inline: 'fallback',
              filename: 'g6Layout.worker.js',
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
  plugins: process.env.ANALYZE ?
    [new Visualizer(), new BundleAnalyzerPlugin(), new webpack.optimize.AggressiveMergingPlugin()] :
    [new webpack.optimize.AggressiveMergingPlugin()],
  devtool: 'source-map',
};
