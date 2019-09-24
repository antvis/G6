/**
 * @fileOverview entry file
 * @author huangtonger@aliyun.com
 */
const Global = require('./global');
const G = require('@antv/g/lib');
const Shape = require('./shape');
const Layout = require('./layout');
const Behaviors = require('./behavior');

const G6 = {
  Graph: require('./graph/graph'),
  TreeGraph: require('./graph/tree-graph'),
  Util: require('./util/'),
  G,
  Global,
  Shape,
  Layout,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: Behaviors.registerBehavior,
  registerLayout: Layout.registerLayout,
  version: Global.version
};

module.exports = G6;
