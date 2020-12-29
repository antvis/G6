import Behavior from './behavior';
import AbstractGraph from './graph/graph';
import Shape, { Arrow, Marker } from './shape';
import Global from './global';
import Util from './util';
// 用于 PC 和 Mobile 端分别实现 layout 和 updateLayoutCfg 方法
import AbstractLayout from './graph/controller/layout';
import AbstractEvent from './graph/controller/event';

import Node from './item/node';
import Edge from './item/edge';
import Hull from './item/hull';
import Combo from './item/combo';

const registerNode = Shape.registerNode;
const registerEdge = Shape.registerEdge;
const registerCombo = Shape.registerCombo;
const registerBehavior = Behavior.registerBehavior;
const BaseGlobal = Global;

export {
  Arrow,
  Shape,
  Node,
  Edge,
  Combo,
  Hull,
  Marker,
  registerNode,
  registerCombo,
  AbstractGraph,
  Util,
  registerEdge,
  registerBehavior,
  AbstractLayout,
  AbstractEvent,
  BaseGlobal,
};

export * from './types';

export default {
  version: Global.version,
  AbstractGraph,
  BaseGlobal,
  Util,
  Shape,
  Node,
  Edge,
  Combo,
  Hull,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerCombo: Shape.registerCombo,
  registerBehavior: Behavior.registerBehavior,
  Arrow,
  Marker,
  AbstractLayout,
  AbstractEvent,
};
