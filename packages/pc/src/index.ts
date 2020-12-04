import Behaviors from './behavior';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
import Shape, { Arrow, Marker } from './shape';
import Layout from './layout';
import Global from './global';
import Util from './util';
import Plugins from './plugins';
import * as Algorithm from './algorithm';

const registerNode = Shape.registerNode;
const registerEdge = Shape.registerEdge;
const registerCombo = Shape.registerCombo;
const registerBehavior = Behaviors.registerBehavior;
const registerLayout = Layout.registerLayout;
const Minimap = Plugins.Minimap;
const Grid = Plugins.Grid;
const Bundling = Plugins.Bundling;
const Menu = Plugins.Menu;
const Fisheye = Plugins.Fisheye;
const ToolBar = Plugins.ToolBar;
const Tooltip = Plugins.Tooltip;
const TimeBar = Plugins.TimeBar;
const ImageMinimap = Plugins.ImageMinimap;
const EdgeFilterLens = Plugins.EdgeFilterLens;

export {
  registerNode,
  registerCombo,
  Graph,
  TreeGraph,
  Util,
  registerEdge,
  Layout,
  Global,
  registerLayout,
  Minimap,
  Grid,
  Bundling,
  Menu,
  Fisheye,
  registerBehavior,
  Algorithm,
  ToolBar,
  Tooltip,
  TimeBar,
  ImageMinimap,
  EdgeFilterLens
};

export default {
  version: Global.version,
  Graph,
  TreeGraph,
  Util,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerCombo: Shape.registerCombo,
  registerBehavior: Behaviors.registerBehavior,
  registerLayout: Layout.registerLayout,
  Layout,
  Global,
  Minimap: Plugins.Minimap,
  Grid: Plugins.Grid,
  Bundling: Plugins.Bundling,
  Menu: Plugins.Menu,
  ToolBar: Plugins.ToolBar,
  Tooltip: Plugins.Tooltip,
  TimeBar,
  Fisheye,
  ImageMinimap,
  EdgeFilterLens,
  Algorithm,
  Arrow,
  Marker,
};
