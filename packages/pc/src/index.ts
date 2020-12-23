import {
  registerBehavior,
  registerCombo,
  registerEdge,
  registerNode,
  Arrow,
  Marker,
} from '@antv/g6-core';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
import { Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import Plugin from './plugin';
import * as Algorithm from '@antv/algorithm';
import './element';
import './behavior';

// const registerLayout = Layout.registerLayout;
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

export * from '@antv/g6-core';
export * from './types';
export * from './interface/graph';

export {
  Graph,
  TreeGraph,
  Util,
  Layout,
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
  Arrow,
  Marker,
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
  Fisheye,
  ImageMinimap,
  EdgeFilterLens,
  Algorithm,
  Arrow,
  Marker,
};
