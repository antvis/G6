import { version } from '../package.json'
import Behaviors from './behavior';
import Graph from './graph/graph'
import TreeGraph from './graph/tree-graph'
import Shape from './shape';
import Layout from './layout';

export default {
  version,
  Graph,
  TreeGraph,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: Behaviors.registerBehavior,
  Layout
}
