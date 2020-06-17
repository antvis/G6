import { version } from '../package.json';
import Behaviors from './behavior';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
import Shape from './shape';
import Layout from './layout';
import Global from './global';
import Util from './util';
import Plugins from './plugins';
import * as Algorithm from './algorithm'

const registerNode = Shape.registerNode;
const registerEdge = Shape.registerEdge;
const registerCombo = Shape.registerCombo;
const registerBehavior = Behaviors.registerBehavior;
const registerLayout = Layout.registerLayout;
const Minimap = Plugins.Minimap;
const Grid = Plugins.Grid;
const Bundling = Plugins.Bundling;
const Menu = Plugins.Menu;
const ToolBar = Plugins.ToolBar
const Tooltip = Plugins.Tooltip

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
  registerBehavior,
  Algorithm,
  ToolBar,
  Tooltip
};

export default {
  version,
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
  Algorithm
};
