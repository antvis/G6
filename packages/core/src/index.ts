import Behaviors from './behavior';
import AbstractGraph from './graph/graph';
import Shape, { Arrow, Marker } from './shape';
import Global from './global';
import Util from './util';
// 用于 PC 和 Mobile 端分别实现 layout 和 updateLayoutCfg 方法
import AbstractLayout from './graph/controller/layout';
import AbstractEvent from './graph/controller/event';

const registerNode = Shape.registerNode;
const registerEdge = Shape.registerEdge;
const registerCombo = Shape.registerCombo;
const registerBehavior = Behaviors.registerBehavior;

export {
  registerNode,
  registerCombo,
  AbstractGraph,
  Util,
  registerEdge,
  registerBehavior,
  AbstractLayout,
  AbstractEvent,
};

export * from './types';
export * from './interface/graph';
export * from './interface/item';
export * from './interface/shape';
export * from './interface/behavior';

export default {
  version: Global.version,
  AbstractGraph,
  Util,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerCombo: Shape.registerCombo,
  registerBehavior: Behaviors.registerBehavior,
  Arrow,
  Marker,
  AbstractLayout,
  AbstractEvent,
};
