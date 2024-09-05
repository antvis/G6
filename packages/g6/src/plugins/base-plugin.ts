import { BaseExtension } from '../registry/extension';
import type { CustomPluginOption } from '../spec/plugin';

export interface BasePluginOptions extends CustomPluginOption {}

/**
 * <zh/> 插件的基类
 *
 * <en/> Base class for plugins
 */
export abstract class BasePlugin<T extends BasePluginOptions> extends BaseExtension<T> {}
