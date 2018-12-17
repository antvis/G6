/**
 * @fileOverview entry file
 * @author huangtonger@aliyun.com
 */
const Shape = require('./shape/');
const Global = require('./global');
const G = require('@antv/g/lib');

const G6 = {
  Graph: require('./graph/graph'),
  Util: require('./util/'),
  G,
  Global,
  Shape,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerGroup: Shape.registerGroup,
  registerGuide: Shape.registerGuide,
  version: '3.0.0-beta.1'
};

module.exports = G6;
