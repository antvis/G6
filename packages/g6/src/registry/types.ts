import type { DisplayObject } from '@antv/g';
import type { BaseNode, BaseNodeStyleProps } from '../elements/nodes';
import type { AnimationFactor } from '../animations/types';

// TODO 待使用正式类型定义 / To be used formal type definition
declare type Node = BaseNode<BaseNodeStyleProps<any>, DisplayObject>;
declare type Edge = unknown;
declare type Combo = unknown;
declare type Theme = unknown;
declare type Layout = unknown;
declare type Behavior = unknown;
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
  layout: Record<string, { new (...args: any[]): Layout }>;
  behavior: Record<string, { new (...args: any[]): Behavior }>;
  widget: Record<string, { new (...args: any[]): Widget }>;
  animation: Record<string, AnimationFactor>; // animation is a function
}

/**
 * <zh/> 插件分类
 *
 * <en/> Plugin category
 */
export type PluginCategory = keyof PluginRegistry;
