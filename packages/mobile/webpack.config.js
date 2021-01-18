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

const graphExtenders = fs.readdirSync(path.join(__dirname, './src/extends/graph'));
const layoutExtenders = fs.readdirSync(path.join(__dirname, './src/extends/layout'));
graphExtenders.forEach((name) => {
  entry[name] = `./src/extends/graph/${name}/index.ts`;
});
layoutExtenders.forEach((name) => {
  entry[name] = `./src/extends/layout/${name}/index.ts`;
});

module.exports = {
  entry,
  output: {
    filename: (pathData) => {
      const chunkName = pathData.chunk.name;
      let filename = 'index.js';
      if ('g6' === chunkName) {
        filename = 'g6.js';
      }
      if (/graph/i.test(chunkName)) {
        filename = 'extends/graph/[name].js';
      }
      if (/layout/i.test(chunkName)) {
        filename = 'extends/layout/[name].js';
      }
      return filename;
    },
    library: 'G6',
    libraryTarget: 'commonjs2',
    path: resolve(process.cwd(), 'dist/'),
  },
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
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
  plugins: process.env.ANALYZE
    ? [new Visualizer(), new BundleAnalyzerPlugin(), new webpack.optimize.AggressiveMergingPlugin()]
    : [new webpack.optimize.AggressiveMergingPlugin()],
  devtool: 'source-map',
};
