import { dark, light } from './themes';
import { idOf } from './utils/id';
import { omitStyleProps, subStyleProps } from './utils/prefix';
import { treeToGraphData } from './utils/tree';

export { BaseBehavior, DragCanvas, ZoomCanvas } from './behaviors';
export {
  CanvasEvent,
  ComboEvent,
  CommonEvent,
  ContainerEvent,
  EdgeEvent,
  ExtensionCategory,
  GraphEvent,
  NodeEvent,
} from './constants';
export { BaseCombo } from './elements/combos';
export { BaseEdge } from './elements/edges';
export { BaseNode } from './elements/nodes';
export { BaseShape } from './elements/shapes';
export { BasePlugin, CameraSetting } from './plugins';
export { getExtension, getExtensions, register } from './registry';
export { Graph } from './runtime/graph';
export { Shortcut } from './utils/shortcut';

export type { BaseBehaviorOptions, DragCanvasOptions, ZoomCanvasOptions } from './behaviors';
export type { BaseComboStyleProps } from './elements/combos';
export type { BaseEdgeStyleProps } from './elements/edges';
export type { BaseNodeStyleProps } from './elements/nodes';
export type { BaseShapeStyleProps } from './elements/shapes';
export type { BasePluginOptions, CameraSettingOptions } from './plugins';
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
export type {
  IDragEvent,
  IElementEvent,
  IKeyboardEvent,
  IPointerEvent,
  IWheelEvent,
  Point,
  Vector2,
  Vector3,
  ViewportAnimationEffectTiming,
} from './types';
export type { ShortcutKey } from './utils/shortcut';

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
