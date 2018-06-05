/**
 * @fileOverview entry file
 * @author huangtonger@aliyun.com
 */
const Shape = require('./shape/');
const Handler = require('./handler');
const Global = require('./global');

const G6 = {
  Graph: require('./graph'),
  Tree: require('./tree'),
  Util: require('./util/'),
  Layouts: require('./layouts/'),
  G: require('@antv/g'),
  Global,
  Plugins: {},
  Shape,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerGroup: Shape.registerGroup,
  registerGuide: Shape.registerGuide,
  registerBehaviour: Handler.registerBehaviour,
  version: Global.version
};

G6.track = function(enable) {
  Global.trackable = enable;
};
require('./track');

module.exports = G6;
