import Behavior from './behavior';
import AbstractGraph from './graph/graph';

// TODO: [G 升级 POC 忽略内容]
// import { Arrow, Marker } from './element'

import Shape from './element';
import { IBehavior } from './types';
import Global from './global';
import Util from './util';
// 用于 PC 和 Mobile 端分别实现 layout 和 updateLayoutCfg 方法
import AbstractLayout from './graph/controller/layout';
import AbstractEvent from './graph/controller/event';

import Node from './item/node';
import Edge from './item/edge';

// TODO: [G 升级 POC 忽略内容]
// import Hull from './item/hull';
// import Combo from './item/combo';

const registerNode = Shape.registerNode;
const registerEdge = Shape.registerEdge;

// TODO: [G 升级 POC 忽略内容]
// const registerCombo = Shape.registerCombo;

const registerBehavior = (Behavior as IBehavior).registerBehavior;
const BaseGlobal = Global;

export * from './types';

export {
  Shape,
  Node,
  Edge,
  // TODO: [G 升级 POC 忽略内容]
  // Combo,
  // Hull,
  // Marker,
  // Arrow,
  // registerCombo,
  registerNode,
  AbstractGraph,
  Util,
  registerEdge,
  registerBehavior,
  AbstractLayout,
  AbstractEvent,
  BaseGlobal,
};

export default {
  version: Global.version,
  AbstractGraph,
  BaseGlobal,
  Util,
  Shape,
  Node,
  Edge,
  // TODO: [G 升级 POC 忽略内容]
  // Combo,
  // Hull,
  // Arrow,
  // Marker,
  // registerCombo: Shape.registerCombo,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: (Behavior as IBehavior).registerBehavior,
  AbstractLayout,
  AbstractEvent,
};
