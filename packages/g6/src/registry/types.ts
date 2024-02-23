import type { Layout } from '@antv/layout';
import type { STDAnimation } from '../animations/types';
import type { BaseBehavior } from '../behaviors/base-behavior';
import type { STDPalette } from '../palettes/types';
import type { Theme } from '../themes/types';
import type { Node } from '../types';

// TODO 待使用正式类型定义 / To be used formal type definition
declare type Edge = unknown;
declare type Combo = unknown;
declare type Widget = unknown;

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
  behavior: Record<string, { new (...args: any[]): BaseBehavior<any> }>;
  widget: Record<string, { new (...args: any[]): Widget }>;
  animation: Record<string, STDAnimation>; // animation spec
}

/**
 * <zh/> 插件分类
 *
 * <en/> Plugin category
 */
export type PluginCategory = keyof PluginRegistry;
