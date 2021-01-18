import 'regenerator-runtime/runtime';
import { registerBehavior, registerCombo, registerEdge, registerNode } from '@antv/g6-core';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
// import Shape, { Arrow, Marker } from './element';
import { Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import Plugin from './plugin';
import * as Algorithm from '@antv/algorithm';
import './element';
import './behavior';

export { IGraph } from './interface/graph';

export { Graph, TreeGraph, Util, Layout, Global, Algorithm };

export default {
  version: Global.version,
  Graph,
  TreeGraph,
  Util,
  Layout,
  registerLayout,
  Global,
  registerBehavior,
  registerCombo,
  registerEdge,
  registerNode,
  Algorithm,
};
