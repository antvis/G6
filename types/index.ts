import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { BBox } from '@antv/g-base/lib/types';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import { IGraph } from '../src/interface/graph';
import { IItem, INode } from '../src/interface/item'
import { G } from '@antv/g/lib'



// Math types
export interface IPoint {
  x: number;
  y: number;
  // 获取连接点时使用
  anchorIndex?: number;
}

export type Matrix = number[];

export interface IBBox extends BBox {
  centerX?: number;
  centerY?: number;
}

export type Padding = number | string | number[];

// Shape types
export type ShapeStyle = Partial<{
  x: number;
  y: number;
  r: number;
  stroke: string | null;
  strokeOpacity: number;
  fill: string | null;
  fillOpacity: number;
  lineWidth: number;
  path: string | object[];
  points: object[];
  matrix: number[];
  opacity: number;
  size: number | Array<number>;
  [key: string]: string | number | object | object[]
}>


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

export type SourceTarget = 'source' | 'target'

// model types (node edge group)
export type ModelStyle = Partial<{
  [key: string]: unknown
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
  }
  icon: {
    show?: boolean;
    // icon的地址，字符串类型
    img?: string;
    width?: number;
    height?: number;
    offset?: number;
  }
  // loop edge config
  loopCfg: {
    dist?: number;
    position?: string;
    // 如果逆时针画，交换起点和终点
    clockwise?: boolean;
  };
  labelCfg?: object;
  anchorPoints: IPoint[];
  controlPoints: IPoint[];
  size: number | number[];
  img: string;

  clipCfg: {
    show?: boolean;
    type?: string;
    // circle
    r?: number,
    // ellipse
    rx?: number,
    ry?: number,
    // rect
    width?: number,
    height?: number,
    // polygon
    points?: Array<Array<number>>;
    // path
    path?: Array<Array<string | number>>;
    // 坐标
    x?: number,
    y?: number,
    // clip 的属性样式
    style?: {
      lineWidth?: number
    }
  }
}>

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
}>

export type Easeing =
    | 'easeLinear'
    | 'easePolyIn'
    | 'easePolyOut'
    | 'easePolyInOut'
    | 'easeQuad'
    | 'easeQuadIn'
    | 'easeQuadOut'
    | 'easeQuadInOut'
    | string


export interface ModelConfig extends ModelStyle {
  shape?: string;
  label?: string;
  labelCfg?: object;
  groupId?: string;
  description?: string;
  x?: number;
  y?: number;
  size?: number;
  controlPoints?: IPoint[];
  anchorPoints?: IPoint[];
  color?: string;
  preRect?: object;
  logoIcon?: object;
  stateIcon?: object;
  innerR?: number;
  direction?: string;
  startPoint?: IPoint;
  endPoint?: IPoint;
}
export interface NodeConfig extends ModelConfig {
  id: string;
  groupId?: string;
  description?: string;
}

export interface EdgeConfig extends ModelConfig  {
  id?: string;
  source: string;
  target: string;
  label?: string;
  labelCfg?: object;
  sourceNode?: INode;
  targetNode?: INode;
  startPoint?: IPoint;
  endPoint?: IPoint;
  controlPoints?: IPoint[];
  color?: string;
  curveOffset?: number;
}

export interface NodeMapConfig {
  [key: string]: NodeConfig
}

export interface GroupConfig {
  id: string;
  parentId?: string;
  [key: string]: string | ModelStyle;
}

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
  DDROP = 'drop',
  NODE_CLICK = 'node:click',
  EDGE_CLICK = 'edge:click',
  NODE_CONTEXTMENU = 'node:contextmenu',
  EDGE_CONTEXTMENU = 'edge:contextmenu',
  NODE_DBLCLICK = 'node:dblclick',
  EDGE_DBLCLICK = 'edge:dblclick',
  NODE_DRAGSTART = 'node:dragstart',
  NODE_DRAG = 'node:drag',
  NODE_DRAGEND = 'node:dragend',
  CANVAS_MOUSEDOWN = 'canvas:mousedown',
  CANVAS_MOUSEMOVE = 'canvas:mousemove',
  CANVAS_MOUSEUP = 'canvas:mouseup',
  CANVAS_CLICK = 'canvas:click',
  CANVAS_MOSUELEAVE = 'canvas:mouseleave',
  KEYUP = 'keyup',
  KEYDOWN = 'keydown'
}

type GetEvents = 'getEvents';
type ShouldBegin = 'shouldBegin';
type ShouldUpdate = 'shouldUpdate';
type ShouldEnd = 'shouldEnd'
type Bind = 'bind'
type Unbind = 'unbind'

export type DefaultBehaviorType = IG6GraphEvent | string | number | object

export type BehaviorOpation<U> = {
  [T in keyof U]:
  T extends GetEvents ? () => { [key in G6Event]?: string } :
  T extends ShouldBegin ? (cfg?: ModelConfig) => boolean :
  T extends ShouldEnd ? (cfg?: ModelConfig) => boolean :
  T extends ShouldUpdate ? (cfg?: ModelConfig) => boolean :
  T extends Bind ? (graph: IGraph) => void :
  T extends Unbind ? (graph: IGraph) => void :
  (...args: DefaultBehaviorType[]) => unknown;
}



export type IEvent = Record<G6Event, string>

export interface IG6GraphEvent extends GraphEvent {
  item: IItem;
  canvasX: number;
  canvasY: number;
  wheelDelta: number;
  detail: number;
  target: G.Shape;
}
export interface IG6GraphNodeEvent extends IG6GraphEvent {
  item: INode;
}

export interface IBehavior {
  constructor: (cfg?: object) => void;
  getEvents: () => { [key in G6Event]?: string };
  shouldBegin: () => boolean;
  shouldUpdate: () => boolean;
  shouldEnd: () => boolean;
  bind: (graph: IGraph) => void;
  unbind: (graph: IGraph) => void;
  [key: string]: (...args: DefaultBehaviorType[]) => unknown;
}

export type Data = {
  nodes?: NodeConfig[]
  edges?: EdgeConfig[]
  groups?: GroupConfig[]
}
