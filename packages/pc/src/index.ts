import {
  registerBehavior,
  registerCombo,
  registerEdge,
  registerNode,
  Arrow,
  Marker,
  Shape,
} from '@antv/g6-core';
import { Group as IGroup, DisplayObject as IShape, Canvas as ICanvas } from '@antv/g';
import * as AlgorithmSync from '@antv/algorithm';
import * as AlgorithmAsync from '@antv/algorithm/lib/asyncIndex';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
import { TreeLayout, Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import Plugin from './plugin';
import './element';
import './behavior';

type IAlgorithm = typeof AlgorithmSync | typeof AlgorithmAsync;
const Algorithm: IAlgorithm = { ...AlgorithmSync, ... AlgorithmAsync };

const Grid = Plugin.Grid;
const Minimap = Plugin.Minimap;
const Bundling = Plugin.Bundling;
const Menu = Plugin.Menu;
const Fisheye = Plugin.Fisheye;
const ToolBar = Plugin.ToolBar;
const Tooltip = Plugin.Tooltip;
const TimeBar = Plugin.TimeBar;
const ImageMinimap = Plugin.ImageMinimap;
const EdgeFilterLens = Plugin.EdgeFilterLens;
const SnapLine = Plugin.SnapLine;
const Legend = Plugin.Legend;

export * from '@antv/g6-core';
export * from './types';
export * from './interface/graph';

export {
  Graph,
  TreeGraph,
  Util,
  Layout,
  TreeLayout,
  registerLayout,
  Global,
  Minimap,
  Grid,
  Bundling,
  Menu,
  Fisheye,
  Algorithm,
  ToolBar,
  Tooltip,
  TimeBar,
  ImageMinimap,
  EdgeFilterLens,
  SnapLine,
  Legend,
  Arrow,
  Marker,
  Shape,
  // 对外暴露 G-Base 的几个类型定义
  ICanvas,
  IGroup,
  IShape,
};

export default {
  version: Global.version,
  Graph,
  TreeGraph,
  Util,
  Layout,
  TreeLayout,
  registerLayout,
  Global,
  registerBehavior,
  registerCombo,
  registerEdge,
  registerNode,
  Minimap: Plugin.Minimap,
  Grid: Plugin.Grid,
  Bundling: Plugin.Bundling,
  Menu: Plugin.Menu,
  ToolBar: Plugin.ToolBar,
  Tooltip: Plugin.Tooltip,
  Legend: Plugin.Legend,
  TimeBar,
  SnapLine,
  Fisheye,
  ImageMinimap,
  EdgeFilterLens,
  Algorithm,
  Arrow,
  Marker,
  Shape,
};
