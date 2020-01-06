import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { BBox } from '@antv/g-base/lib/types';
import Canvas from '@antv/g-canvas/lib/canvas';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import Node from '@g6/item/node';
import { IGraph } from '../src/interface/graph';
import { IEdge, IItemBase, INode } from '../src/interface/item';

// Math types
export interface IPoint {
  x: number;
  y: number;
  // 获取连接点时使用
  anchorIndex?: number;
  [key: string]: number | undefined;
}

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
  offset: number | number[];
  stroke: string | null;
  strokeOpacity: number;
  fill: string | null;
  fillOpacity: number;
  lineWidth: number;
  path: string | object[];
  points: object[];
  matrix: number[];
  opacity: number;
  size: number | number[];
  endArrow: boolean | ArrowConfig;
  startArrow: boolean | ArrowConfig;
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

// model types (node edge group)
export type ModelStyle = Partial<{
  [key: string]: unknown;
  style: ShapeStyle;
  stateStyles: {
    [key: string]: ShapeStyle;
  };
  linkPoints: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    size?: number;
    lineWidth?: number;
    fill?: string;
    stroke?: string;
    [key: string]: unknown;
  };
  icon: {
    show?: boolean;
    // icon的地址，字符串类型
    img?: string;
    width?: number;
    height?: number;
    offset?: number;
  };
  // loop edge config
  loopCfg: {
    dist?: number;
    position?: string;
    // 如果逆时针画，交换起点和终点
    clockwise?: boolean;
  };
  labelCfg?: object;
  anchorPoints: number[][];
  controlPoints: IPoint[];
  size: number | number[];
  img: string;

  clipCfg: {
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
    style?: {
      lineWidth?: number;
    };
  };
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
  fill: string | null;
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
  shape?: string;
  label?: string;
  labelCfg?: {
    style?: object;
    [key: string]: unknown;
  };
  descriptionCfg?: {
    style?: object;
    [key: string]: unknown;
  };
  groupId?: string;
  description?: string;
  x?: number;
  y?: number;
  size?: number | number[];
  controlPoints?: IPoint[];
  color?: string;
  preRect?: object;
  logoIcon?: {
    show?: boolean;
    [key: string]: unknown;
  };
  stateIcon?: object;
  innerR?: number;
  direction?: string;
  startPoint?: IPoint;
  endPoint?: IPoint;
  children?: TreeGraphData[];
}
export interface NodeConfig extends ModelConfig {
  id: string;
  groupId?: string;
  description?: string;
}

export interface EdgeConfig extends ModelConfig {
  id?: string;
  source: string;
  target: string;
  label?: string;
  labelCfg?: {
    style?: object;
    [key: string]: unknown;
  };
  sourceNode?: Node;
  targetNode?: Node;
  startPoint?: IPoint;
  endPoint?: IPoint;
  controlPoints?: IPoint[];
  color?: string;
  curveOffset?: number;
}

export type EdgeData = EdgeConfig & {
  sourceNode: Node;
  targetNode: Node;
  startPoint: IPoint;
  endPoint: IPoint;
};

export interface NodeMapConfig {
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
  depth?: number;
  data?: ModelConfig;
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
}

type GetEvents = 'getEvents';
type ShouldBegin = 'shouldBegin';
type ShouldUpdate = 'shouldUpdate';
type ShouldEnd = 'shouldEnd';
type Bind = 'bind';
type Unbind = 'unbind';

export type DefaultBehaviorType = IG6GraphEvent | string | number | object;

export type BehaviorOpation<U> = {
  [T in keyof U]: T extends GetEvents
    ? () => { [key in G6Event]?: string }
    : T extends ShouldBegin
    ? (cfg?: ModelConfig) => boolean
    : T extends ShouldEnd
    ? (cfg?: ModelConfig) => boolean
    : T extends ShouldUpdate
    ? (cfg?: ModelConfig) => boolean
    : T extends Bind
    ? (graph: IGraph) => void
    : T extends Unbind
    ? (graph: IGraph) => void
    : (...args: DefaultBehaviorType[]) => unknown;
};

export type IEvent = Record<G6Event, string>;

export interface IG6GraphEvent extends GraphEvent {
  item: Item;
  canvasX: number;
  canvasY: number;
  wheelDelta: number;
  detail: number;
  key?: string;
  target: Item & Canvas;
}

// Node Edge 实例或ID
export type Item = INode | IEdge;

export type ITEM_TYPE = 'node' | 'edge' | 'group'

// 触发 viewportchange 事件的参数
export interface ViewPortEventParam {
  action: string;
  matrix: Matrix;
}