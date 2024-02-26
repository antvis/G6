import type { Layout } from '@antv/layout';
import type { STDAnimation } from '../animations/types';
import type { Behavior } from '../behaviors/types';
import type { STDPalette } from '../palettes/types';
import type { Theme } from '../themes/types';
import type { Edge, Node } from '../types';
import type { Widget } from '../widgets/types';

// TODO 待使用正式类型定义 / To be used formal type definition
declare type Combo = unknown;

/**
 * <zh/> 插件注册表
 *
 * <en/> Plugin registry
 */
export interface PluginRegistry {
  node: Record<string, { new (...args: any[]): Node }>;
  edge: Record<string, { new (...args: any[]): Edge }>;
  combo: Record<string, { new (...args: any[]): Combo }>;
  theme: Record<string, Theme>; // theme is a object options
  palette: Record<string, STDPalette>;
  layout: Record<string, { new (...args: any[]): Layout<any> }>;
  behavior: Record<string, { new (...args: any[]): Behavior }>;
  widget: Record<string, { new (...args: any[]): Widget }>;
  animation: Record<string, STDAnimation>; // animation spec
}

/**
 * <zh/> 插件分类
 *
 * <en/> Plugin category
 */
export type PluginCategory = keyof PluginRegistry;
