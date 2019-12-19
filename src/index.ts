import Shape from './shape';
import Behaviors from './behavior';
import { version } from '../package.json'

export default {
  version,
  registerNode: Shape.registerNode,
  registerEdge: Shape.registerEdge,
  registerBehavior: Behaviors.registerBehavior
}

// export default G6