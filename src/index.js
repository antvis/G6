/**
 * @fileOverview entry file
 * @author huangtonger@aliyun.com
 */
// const Shape = require('./shape/');
const Global = require('./global');
const G = require('@antv/g/lib');
const Shape = require('./shape');
const Behaviors = require('./behavior');

const G6 = {
  Graph: require('./graph/graph'),
  TreeGraph: require('./graph/tree-graph'),
  Util: require('./util/'),
  G,
  Global,
  Shape,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: Behaviors.registerBehavior,
  version: Global.version
};

module.exports = G6;
