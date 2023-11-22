import { runtime } from '@antv/g';
import { Graph as EmptyGraph } from './runtime/graph';
import { Extensions, stdLib } from './stdlib';
import * as Util from './util';
import { extend } from './util/extend';

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
