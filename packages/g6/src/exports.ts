import { dark, light } from './themes';
import { idOf } from './utils/id';
import { omitStyleProps, subStyleProps } from './utils/prefix';
import { treeToGraphData } from './utils/tree';

export { BaseBehavior } from './behaviors';
export { CanvasEvent, ComboEvent, CommonEvent, ContainerEvent, EdgeEvent, GraphEvent, NodeEvent } from './constants';
export { BaseCombo } from './elements/combos';
export { BaseEdge } from './elements/edges';
export { BaseNode } from './elements/nodes';
export { BaseShape } from './elements/shapes';
export { BasePlugin } from './plugins';
export { getExtension, getExtensions, register } from './registry';
export { Graph } from './runtime/graph';

export type { BaseBehaviorOptions } from './behaviors';
export type { BaseComboStyleProps } from './elements/combos';
export type { BaseEdgeStyleProps } from './elements/edges';
export type { BaseNodeStyleProps } from './elements/nodes';
export type { BaseShapeStyleProps } from './elements/shapes';
export type { BasePluginOptions } from './plugins';
export type { RuntimeContext } from './runtime/types';
export type {
  BehaviorOptions,
  CanvasOptions,
  ComboData,
  ComboOptions,
  EdgeData,
  EdgeOptions,
  G6Spec,
  GraphData,
  LayoutOptions,
  NodeData,
  NodeOptions,
  PluginOptions,
  ThemeOptions,
  ViewportOptions,
} from './spec';
export type { Point, Vector2, Vector3 } from './types';

const Utils = {
  idOf,
  treeToGraphData,
  subStyleProps,
  omitStyleProps,
};

const Theme = {
  dark,
  light,
};

export { Theme, Utils };
