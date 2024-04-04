import type { Layout } from '@antv/layout';
import type { STDAnimation } from '../animations/types';
import type { Behavior } from '../behaviors/types';
import type { STDPalette } from '../palettes/types';
import type { Plugin } from '../plugins/types';
import type { Theme } from '../themes/types';
import type { Combo, Edge, Node } from '../types';

/**
 * <zh/> 扩展注册表
 *
 * <en/> Extension registry
 */
export interface ExtensionRegistry {
  node: Record<string, { new (...args: any[]): Node }>;
  edge: Record<string, { new (...args: any[]): Edge }>;
  combo: Record<string, { new (...args: any[]): Combo }>;
  theme: Record<string, Theme>; // theme is a object options
  palette: Record<string, STDPalette>;
  layout: Record<string, { new (...args: any[]): Layout<any> }>;
  behavior: Record<string, { new (...args: any[]): Behavior }>;
  plugin: Record<string, { new (...args: any[]): Plugin }>;
  animation: Record<string, STDAnimation>; // animation spec
}
