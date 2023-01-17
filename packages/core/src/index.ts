import EmptyGraph from './runtime/graph';
import { stdLib } from './stdlib';
import { extend } from './util/extend';
export * from './types';

/**
 * Extend the graph class with std lib
 */
const Graph = extend(EmptyGraph<{}>, stdLib);

export { Graph, stdLib };

export default { Graph, stdLib };
