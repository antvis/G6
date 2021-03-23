import {
  registerBehavior,
  registerCombo,
  registerEdge,
  registerNode,
  Arrow,
  Marker,
  Shape,
} from '@antv/g6-core';
import { ICanvas, IGroup, IShape } from '@antv/g-base';
import * as Algorithm from '@antv/algorithm';
import Graph, { registerGraph as oRegisterGraph } from './graph/graph';
import { Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import './element';
import './behavior';

function registerExtenderWrapper<T1, T2>(
  registerExtender: (registerName: T1, registerFunction: T2, global: Object) => Object,
): (registerName: T1, registerFunction: T2) => Object {
  return function (...args) {
    return registerExtender.apply(null, [...args, G6]);
  };
}

const registerGraph = registerExtenderWrapper(oRegisterGraph);

const G6 = {
  version: Global.version,
  Graph,
  Util,
  Layout,
  registerLayout,
  registerGraph,
  Global,
  registerBehavior,
  registerCombo,
  registerEdge,
  registerNode,
  Algorithm,
  Arrow,
  Marker,
  Shape,
};

export * from '@antv/g6-core';
export * from './types';
export * from './interface/graph';

export {
  Graph,
  Util,
  Layout,
  registerLayout,
  registerGraph,
  Global,
  Algorithm,
  Arrow,
  Marker,
  Shape,
  // 对外暴露 G-Base 的几个类型定义
  ICanvas,
  IGroup,
  IShape,
};

export default G6;
