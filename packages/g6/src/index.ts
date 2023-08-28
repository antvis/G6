import EmptyGraph from './runtime/graph';
import { stdLib } from './stdlib';
import Util from './util';
import { extend } from './util/extend';
export * from './types';

/**
 * Extend the graph class with std lib
 */
const Graph = extend(EmptyGraph<{}, {}>, stdLib);

export { Graph, Util, stdLib };

export default { Graph, stdLib };
