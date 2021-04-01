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
import TreeGraph from './graph/tree-graph';
import { Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import Plugin from './plugin';
import './element';
import './behavior';

const Minimap = Plugin.Minimap;
const Grid = Plugin.Grid;
const Bundling = Plugin.Bundling;
const Menu = Plugin.Menu;
const Fisheye = Plugin.Fisheye;
const ToolBar = Plugin.ToolBar;
const Tooltip = Plugin.Tooltip;
const TimeBar = Plugin.TimeBar;
const ImageMinimap = Plugin.ImageMinimap;
const EdgeFilterLens = Plugin.EdgeFilterLens;
const SnapLine = Plugin.SnapLine;

export * from '@antv/g6-core';
export * from './types';
export * from './interface/graph';

export {
  Graph,
  TreeGraph,
  Util,
  Layout,
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
