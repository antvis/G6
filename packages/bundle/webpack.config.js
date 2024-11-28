const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'g6.umd.js',
    path: path.resolve(__dirname, 'dist/webpack'),
  },
};
