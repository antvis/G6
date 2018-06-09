const webpackConfig = require('./webpack.config');
const _ = require('lodash');

console.log(webpackConfig);
//The Lodash method _.merge exported as a Node.js module.
module.exports = _.merge({
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}, webpackConfig, {
  mode: 'development' // 可直接访问
});
