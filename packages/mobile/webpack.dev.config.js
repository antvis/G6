const webpackConfig = require('./webpack.config');

module.exports = Object.assign(
  {
    devtool: 'cheap-source-map',
    watch: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  webpackConfig,
);
