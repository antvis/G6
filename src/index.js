/**
 * @fileOverview entry file
 * @author huangtonger@aliyun.com
 */
const Shape = require('./shape/');
const Handler = require('./handler');
const Global = require('./global');
const version = require('./version');
const G = require('@antv/g');

const G6 = {
  Graph: require('./graph'),
  Tree: require('./tree'),
  Util: require('./util/'),
  Layouts: require('./layouts/'),
 // G: require('@antv/g'),
  G,
  Plugins: {},
  Global,
  Shape,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerGroup: Shape.registerGroup,
  registerGuide: Shape.registerGuide,
  registerBehaviour: Handler.registerBehaviour,
  version,
  getG() {
    return require('@antv/g');
  },
  track(enable) {
    Global.trackable = enable;
  }
};
require('./track');

module.exports = G6;
