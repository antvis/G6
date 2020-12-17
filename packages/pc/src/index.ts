import { registerBehavior, registerCombo, registerEdge, registerNode } from '@antv/g6-core';
import './behavior';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
// import Shape, { Arrow, Marker } from './shape';
import { Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
// import Plugins from './plugins';
import * as Algorithm from '@antv/algorithm';

// const registerLayout = Layout.registerLayout;
// const Minimap = Plugins.Minimap;
// const Grid = Plugins.Grid;
// const Bundling = Plugins.Bundling;
// const Menu = Plugins.Menu;
// const Fisheye = Plugins.Fisheye;
// const ToolBar = Plugins.ToolBar;
// const Tooltip = Plugins.Tooltip;
// const TimeBar = Plugins.TimeBar;
// const ImageMinimap = Plugins.ImageMinimap;
// const EdgeFilterLens = Plugins.EdgeFilterLens;

export * from '@antv/g6-core';
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
  // Algorithm,
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
  // Minimap: Plugins.Minimap,
  // Grid: Plugins.Grid,
  // Bundling: Plugins.Bundling,
  // Menu: Plugins.Menu,
  // ToolBar: Plugins.ToolBar,
  // Tooltip: Plugins.Tooltip,
  // TimeBar,
  // Fisheye,
  // ImageMinimap,
  // EdgeFilterLens,
  Algorithm,
  // Arrow,
  // Marker,
};
