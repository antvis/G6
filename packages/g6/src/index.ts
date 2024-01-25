/**
 * G6 Core API
 * @packageDocumentation
 */

import { runtime } from '@antv/g';
import packageJson from '../package.json';
import { Extensions, builtInPlugins, stdLib } from './plugin';
import { PluginCategory, register } from './plugin/register';
import { Graph } from './runtime/graph';
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

const version = packageJson.version;

/**
 * <zh/> 注册内置插件
 *
 * <en/> Register built-in plugins
 * @internal
 */
(function registerBuiltInPlugins() {
  Object.keys(builtInPlugins).forEach((category: PluginCategory) => {
    Object.keys(builtInPlugins[category]).forEach((type) => register(category, type, builtInPlugins[category][type]));
  });
})();

export { Extensions, Graph, Util, register, stdLib, version };
