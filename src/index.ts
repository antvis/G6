import { version } from '../package.json'
import Behaviors from './behavior';
import Graph from './graph/graph'
import Shape from './shape';

export default {
  version,
  Graph,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: Behaviors.registerBehavior
}
