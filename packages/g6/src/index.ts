import './preset';

export const version = '5.0.0';
export { BaseBehavior } from './behaviors';
export { CanvasEvent, ComboEvent, CommonEvent, ContainerEvent, EdgeEvent, GraphEvent, NodeEvent } from './constants';
export {
  Circle,
  CircleCombo,
  Cubic,
  CubicHorizontal,
  CubicVertical,
  Ellipse,
  Image,
  Line,
  Polyline,
  Quadratic,
  Rect,
  Star,
  Triangle,
} from './elements';
export { BaseCombo } from './elements/combos';
export { BaseEdge } from './elements/edges';
export { BaseNode } from './elements/nodes';
export { getExtension, getExtensions, register } from './registry';
export { Graph } from './runtime/graph';
export { dark, light } from './themes';
export { treeToGraphData } from './utils/tree';

export type { BaseBehaviorOptions } from './behaviors';
export type { BaseComboStyleProps } from './elements/combos';
export type { BaseEdgeStyleProps } from './elements/edges';
export type { BaseNodeStyleProps } from './elements/nodes';
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
  OptimizeOptions,
  PluginOptions,
  ThemeOptions,
  ViewportOptions,
} from './spec';
export type { Point, Vector2, Vector3 } from './types';
