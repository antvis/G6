const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript' },
              target: 'es2016',
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '...'],
  },
  output: {
    filename: 'g6.umd.js',
    path: path.resolve(__dirname, 'dist/webpack'),
  },
};
