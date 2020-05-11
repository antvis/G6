import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { BBox } from '@antv/g-base/lib/types';
import Canvas from '@antv/g-canvas/lib/canvas';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import Node from '../item/node';
import { IGraph } from '../interface/graph';
import { IEdge, INode } from '../interface/item';
import { ILabelConfig } from '../interface/shape';

// Math types
export interface IPoint {
  x: number;
  y: number;
  // 获取连接点时使用
  anchorIndex?: number;
  [key: string]: number | undefined;
}

export type IPointTuple = [number, number];

export type Matrix = number[];

export interface IBBox extends BBox {
  centerX?: number;
  centerY?: number;
  [key: string]: number | undefined;
}

export type Padding = number | string | number[];

export interface ArrowConfig {
  d?: number;
  path?: string;
}

// Shape types
export type ShapeStyle = Partial<{
  x: number;
  y: number;
  r: number;
  radius: number;
  width: number;
  height: number;
  offset: number | number[];
  stroke: string | null;
  strokeOpacity: number;
  fill: string | null;
  fillOpacity: number;
  lineWidth: number;
  lineAppendWidth: number;
  path: string | object[];
  points: object[];
  matrix: number[];
  opacity: number;
  size: number | number[];
  endArrow: boolean | ArrowConfig;
  startArrow: boolean | ArrowConfig;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  cursor: string;
  position: string;
}>;

export interface IShapeBase extends ShapeBase {
  isKeyShape: boolean;
}

export interface IRect extends IPoint {
  width: number;
  height: number;
}

export interface ICircle extends IPoint {
  r: number;
}

export interface IEllipse extends IPoint {
  rx: number;
  ry: number;
}

export type SourceTarget = 'source' | 'target';

// 自环边配置
export type LoopConfig = Partial<{
  dist: number;
  position: string;
  // 如果逆时针画，交换起点和终点
  clockwise: boolean;
}>;

// model types (node edge group)
export type ModelStyle = Partial<{
  [key: string]: unknown;
  style:
  | ShapeStyle
  | {
    [key: string]: ShapeStyle;
  };
  stateStyles: {
    [key: string]:
    | ShapeStyle
    | {
      [key: string]: ShapeStyle;
    };
  };
  // loop edge config
  loopCfg: LoopConfig;
  labelCfg?: ILabelConfig;
}>;

export type LabelStyle = Partial<{
  rotate: number;
  textAlign: string;
  angle: number;
  x: number;
  y: number;
  text: string;
  stroke: string | null;
  opacity: number;
  fontSize: number;
  fontStyle: string;
  fill: string | null;
  rotateCenter: string;
  lineWidth?: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  position: string;
  textBaseline: string;
  offset: number;
  background?: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
    radius?: number[] | number;
    padding?: number[] | number;
  };
}>;

export type Easeing =
  | 'easeLinear'
  | 'easePolyIn'
  | 'easePolyOut'
  | 'easePolyInOut'
  | 'easeQuad'
  | 'easeQuadIn'
  | 'easeQuadOut'
  | 'easeQuadInOut'
  | string;

export interface ModelConfig extends ModelStyle {
  // ⚠️ 节点或边的类型，后续会废弃
  shape?: string;
  // 节点或边的类型
  type?: string;
  label?: string;
  labelCfg?: ILabelConfig;
  descriptionCfg?: {
    style?: object;
    [key: string]: unknown;
  };
  groupId?: string;
  description?: string;
  x?: number;
  y?: number;
  size?: number | number[];
  img?: string;
  color?: string;
  preRect?: {
    show?: boolean;
    [key: string]: unknown;
  };
  logoIcon?: {
    show?: boolean;
    [key: string]: unknown;
  };
  stateIcon?: {
    show?: boolean;
    [key: string]: unknown;
  };
  anchorPoints?: number[][];
  controlPoints?: IPoint[];
  linkPoints?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    size?: number;
    lineWidth?: number;
    fill?: string;
    stroke?: string;
    r?: number;
    [key: string]: unknown;
  };
  icon?: {
    show?: boolean;
    // icon的地址，字符串类型
    img?: string;
    width?: number;
    height?: number;
    offset?: number;
  };
  clipCfg?: {
    show?: boolean;
    type?: string;
    // circle
    r?: number;
    // ellipse
    rx?: number;
    ry?: number;
    // rect
    width?: number;
    height?: number;
    // polygon
    points?: number[][];
    // path
    path?: Array<Array<string | number>>;
    // 坐标
    x?: number;
    y?: number;
    // clip 的属性样式
    // style?: ShapeStyle
  };
  innerR?: number;
  direction?: string;
  startPoint?: IPoint;
  endPoint?: IPoint;
  children?: TreeGraphData[];
  stateStyles?: {
    [key: string]:
    | ShapeStyle
    | {
      [key: string]: ShapeStyle;
    };
  };
}

export interface NodeConfig extends ModelConfig {
  id: string;
  size?: number | number[];
  groupId?: string;
  description?: string;
}

export interface EdgeConfig extends ModelConfig {
  id?: string;
  source?: string;
  target?: string;
  label?: string;
  labelCfg?: ILabelConfig;
  sourceNode?: Node;
  targetNode?: Node;
  startPoint?: IPoint;
  endPoint?: IPoint;
  controlPoints?: IPoint[];
  color?: string;
  curveOffset?: number | number[];
  curvePosition?: number | number[];
}

export type EdgeData = EdgeConfig & {
  sourceNode: Node;
  targetNode: Node;
  startPoint: IPoint;
  endPoint: IPoint;
};

export interface NodeMap {
  [key: string]: INode;
}

export interface NodeConfigMap {
  [key: string]: NodeConfig;
}

export interface GroupConfig {
  id: string;
  parentId?: string;
  [key: string]: string | ModelStyle | undefined;
}

// export type ModelConfig = NodeConfig | EdgeConfig | GroupConfig

export interface GroupNodeIds {
  [key: string]: string[];
}

export interface GraphData {
  nodes?: NodeConfig[];
  edges?: EdgeConfig[];
  groups?: GroupConfig[];
}

export interface TreeGraphData {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  children?: TreeGraphData[];
  data?: ModelConfig;
  side?: 'left' | 'right';
  depth?: number;
  collapsed?: boolean;
  style?:
  | ShapeStyle
  | {
    [key: string]: ShapeStyle;
  };
  stateStyles?: {
    [key: string]:
    | ShapeStyle
    | {
      [key: string]: ShapeStyle;
    };
  };
}

// Behavior type file
export enum G6Event {
  CLICK = 'click',
  MOUSEDOWN = 'mousedown',
  MOUDEUP = 'mouseup',
  DBLCLICK = 'dblclick',
  CONTEXTMENU = 'contextmenu',
  MOUSEENTER = 'mouseenter',
  MOUSEOUT = 'mouseout',
  MOUSEOVER = 'mouseover',
  MOUSEMOVE = 'mousemove',
  MOUSELEAVE = 'mouseleave',
  DRAGSTART = 'dragstart',
  DRAGEND = 'dragend',
  DRAG = 'drag',
  DRAGENTER = 'dragenter',
  DRAGLEAVE = 'dragleave',
  DRAGOVER = 'dragover',
  DRAGOUT = 'dragout',
  DDROP = 'drop',
  KEYUP = 'keyup',
  KEYDOWN = 'keydown',
  WHEEL = 'wheel',
  FOCUS = 'focus',

  NODE_CLICK = 'node:click',
  NODE_CONTEXTMENU = 'node:contextmenu',
  NODE_DBLCLICK = 'node:dblclick',
  NODE_DRAGSTART = 'node:dragstart',
  NODE_DRAG = 'node:drag',
  NODE_DRAGEND = 'node:dragend',
  NODE_MOUSEENTER = 'node:mouseenter',
  NODE_MOUSELEAVE = 'node:mouseleave',
  NODE_MOUSEMOVE = 'node:mousemove',

  EDGE_CLICK = 'edge:click',
  EDGE_CONTEXTMENU = 'edge:contextmenu',
  EDGE_DBLCLICK = 'edge:dblclick',
  EDGE_MOUSEENTER = 'edge:mouseenter',
  EDGE_MOUSELEAVE = 'edge:mouseleave',
  EDGE_MOUSEMOVE = 'edge:mousemove',

  CANVAS_MOUSEDOWN = 'canvas:mousedown',
  CANVAS_MOUSEMOVE = 'canvas:mousemove',
  CANVAS_MOUSEUP = 'canvas:mouseup',
  CANVAS_CLICK = 'canvas:click',
  CANVAS_MOSUELEAVE = 'canvas:mouseleave',
  CANVAS_DRAGSTART = 'canvas:dragstart',
  CANVAS_DRAG = 'canvas:drag',
  CANVAS_DRAGEND = 'canvas:dragend',
}

export type DefaultBehaviorType = IG6GraphEvent | string | number | object;

export interface BehaviorOption {
  getEvents(): {
    [key in G6Event]?: string;
  };
  getDefaultCfg?(): object;
  shouldBegin?(e?: IG6GraphEvent): boolean;
  shouldUpdate?(e?: IG6GraphEvent): boolean;
  shouldEnd?(e?: IG6GraphEvent): boolean;
  bind?(e: IGraph): void;
  unbind?(e: IGraph): void;
  [key: string]: unknown;
}

export type IEvent = Record<G6Event, string>;

export interface IG6GraphEvent extends GraphEvent {
  item: Item | null;
  canvasX: number;
  canvasY: number;
  wheelDelta: number;
  detail: number;
  key?: string;
  target: Item & Canvas;
}

// Node Edge 实例或ID
export type Item = INode | IEdge;

export type ITEM_TYPE = 'node' | 'edge' | 'group';

export type NodeIdxMap = {
  [key: string]: number;
};

// 触发 viewportchange 事件的参数
export interface ViewPortEventParam {
  action: string;
  matrix: Matrix;
}

export interface Indexable<T> {
  [key: string]: T;
}

export interface LayoutConfig {
  type?: string;
  [key: string]: unknown;
}
