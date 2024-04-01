import type { BasePlugin } from './base-plugin';
import type { GridLineOptions } from './grid-line';
import type { MinimapOptions } from './minimap';

export type BuiltInPluginOptions = GridLineOptions | MinimapOptions;
export type Plugin = BasePlugin<any>;
