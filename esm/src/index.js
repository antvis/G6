import Shape from './shape';
import Behaviors from './behavior';
import { version } from '../package.json';
export default {
    version: version,
    registerNode: Shape.registerNode,
    registerEdge: Shape.registerEdge,
    registerBehavior: Behaviors.registerBehavior
};
// export default G6
//# sourceMappingURL=index.js.map