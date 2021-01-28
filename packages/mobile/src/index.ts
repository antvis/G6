
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
import Graph from './graph/graph';
import { Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import './element';
import './behavior';


const extend = (extender, option) => {
  if (!extender.installed) {
    extender(option, G6)
    extender.installed = true;
  }
  return G6;
};

const G6 = {
  version: Global.version,
  Graph,
  Util,
  Layout,
  registerLayout,
  Global,
  registerBehavior,
  registerCombo,
  registerEdge,
  registerNode,
  extend,
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
