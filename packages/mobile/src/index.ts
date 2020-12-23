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

// const registerLayout = Layout.registerLayout;
// const Minimap = Plugin.Minimap;
// const Grid = Plugin.Grid;
// const Bundling = Plugin.Bundling;
// const Menu = Plugin.Menu;
// const Fisheye = Plugin.Fisheye;
// const ToolBar = Plugin.ToolBar;
// const Tooltip = Plugin.Tooltip;
// const TimeBar = Plugin.TimeBar;
// const ImageMinimap = Plugin.ImageMinimap;
// const EdgeFilterLens = Plugin.EdgeFilterLens;

export { IGraph } from './interface/graph';

export {
  // registerNode,
  // registerCombo,
  Graph,
  TreeGraph,
  Util,
  // registerEdge,
  Layout,
  Global,
  // registerLayout,
  // Minimap,
  // Grid,
  // Bundling,
  // Menu,
  // Fisheye,
  // registerBehavior,
  Algorithm,
  // ToolBar,
  // Tooltip,
  // TimeBar,
  // ImageMinimap,
  // EdgeFilterLens,
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
  // Minimap: Plugin.Minimap,
  // Grid: Plugin.Grid,
  // Bundling: Plugin.Bundling,
  // Menu: Plugin.Menu,
  // ToolBar: Plugin.ToolBar,
  // Tooltip: Plugin.Tooltip,
  // TimeBar,
  // Fisheye,
  // ImageMinimap,
  // EdgeFilterLens,
  Algorithm,
  // Arrow,
  // Marker,
};
