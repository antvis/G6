import { runtime } from '@antv/g';
import { Extensions, stdLib } from './plugin';
import { Graph } from './runtime/graph';
import { getRegisterPlugin, getRegisterPlugins, register, unregister } from './runtime/registry';
import * as Util from './utils';

export * from './types';

export type {
  /**
   * @deprecated Please use `Graph` instead
   */
  Graph as IGraph,
} from './types';

/**
 * Disable CSS parsing for better performance.
 */
runtime.enableCSSParsing = false;

/**
 * Extend the graph class with std lib
 */

const version = '5.0.0';

export { Extensions, Graph, Util, getRegisterPlugin, getRegisterPlugins, register, stdLib, unregister, version };

export default {
  Graph,
  Util,
  stdLib,
  Extensions,
  version,
  register,
  unregister,
  getRegisterPlugins,
  getRegisterPlugin,
};
