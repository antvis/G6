import { runtime } from '@antv/g';
import { Extensions, stdLib } from './plugin';
import { Graph as EmptyGraph } from './runtime/graph';
import * as Util from './utils';
import { extend } from './utils/extend';

export * from './types';

/**
 * Disable CSS parsing for better performance.
 */
runtime.enableCSSParsing = false;

/**
 * Extend the graph class with std lib
 */

const version = '5.0.0';

const Graph = extend(EmptyGraph, stdLib);

export { Extensions, Graph, Util, extend, stdLib, version };

export default { Graph, Util, stdLib, Extensions, extend, version };
