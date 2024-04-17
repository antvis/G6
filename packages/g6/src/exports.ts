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
export { BaseCombo, CircleCombo, RectCombo } from './elements/combos';
export { BaseEdge, Cubic, CubicHorizontal, CubicVertical, Line, Polyline, Quadratic } from './elements/edges';
export { BaseNode, Circle, Diamond, Ellipse, Hexagon, Image, Rect, Star, Triangle } from './elements/nodes';
export { BaseShape } from './elements/shapes';
export { BasePlugin, CameraSetting, History } from './plugins';
export { getExtension, getExtensions, register } from './registry';
export { Graph } from './runtime/graph';
export { BaseTransform } from './transforms';
export { Shortcut } from './utils/shortcut';

export type { BaseBehaviorOptions, DragCanvasOptions, ZoomCanvasOptions } from './behaviors';
export type { BaseComboStyleProps, CircleComboStyleProps, RectComboStyleProps } from './elements/combos';
export type {
  BaseEdgeStyleProps,
  CubicHorizontalStyleProps,
  CubicStyleProps,
  CubicVerticalStyleProps,
  LineStyleProps,
  PolylineStyleProps,
  QuadraticStyleProps,
} from './elements/edges';
export type {
  BaseNodeStyleProps,
  CircleStyleProps,
  DiamondStyleProps,
  EllipseStyleProps,
  HexagonStyleProps,
  ImageStyleProps,
  RectStyleProps,
  StarStyleProps,
  TriangleStyleProps,
} from './elements/nodes';
export type { BaseShapeStyleProps } from './elements/shapes';
export type { BasePluginOptions, CameraSettingOptions, Hull } from './plugins';
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
export type { BaseTransformOptions } from './transforms';
export type {
  IAnimateEvent,
  IDragEvent,
  IElementLifeCycleEvent,
  IEvent,
  IGraphLifeCycleEvent,
  IKeyboardEvent,
  IPointerEvent,
  IViewportEvent,
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
