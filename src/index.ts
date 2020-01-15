import { version } from '../package.json'
import Behaviors from './behavior';
import Graph from './graph/graph'
import TreeGraph from './graph/tree-graph'
import Shape from './shape';
import Layout from './layout';
import Global from './global';
import Util from './util';

export default {
  version,
  Graph,
  TreeGraph,
  Util,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: Behaviors.registerBehavior,
  registerLayout: Layout.registerLayout,
  Layout,
  Global
}
