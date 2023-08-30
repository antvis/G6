import { runtime } from '@antv/g';
import EmptyGraph from './runtime/graph';
import { stdLib, Extensions } from './stdlib';
import Util from './util';
import { extend } from './util/extend';
export * from './types';

/**
 * Disable CSS parsing for better performance.
 */
runtime.enableCSSParsing = false;

/**
 * Extend the graph class with std lib
 */
// @ts-ignore
const Graph = extend(EmptyGraph<{}, {}>, stdLib);

const G6 = { Graph, Util, stdLib, Extensions, extend };

export { Graph, Util, stdLib, Extensions, extend };

export default G6;
