import { BaseExtension } from '../registry/extension';
import type { CustomPluginOption } from '../spec/plugin';

export interface BasePluginOptions extends CustomPluginOption {}

export abstract class BasePlugin<T extends BasePluginOptions> extends BaseExtension<T> {}
