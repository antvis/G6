import { runtime } from '@antv/g';
import EmptyGraph from './runtime/graph';
import { Extensions, stdLib } from './stdlib';
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

const version = '5.0.0-beta.10';

const Graph = extend(EmptyGraph, stdLib);

const G6 = { Graph, Util, stdLib, Extensions, extend, version };

export { Extensions, Graph, Util, extend, stdLib, version };

export default G6;
