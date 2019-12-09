import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { BBox } from '@antv/g-base/lib/types';
import { IGraph } from '../src/interface/graph';
import { IItem, INode } from '../src/interface/item'
import ShapeBase from '_@antv_g-canvas@0.1.1@@antv/g-canvas/lib/shape/base';

// Math types
export interface IPoint {
  x: number;
  y: number;
}

export type IMatrix = number[];

export interface IBBox extends BBox {
  centerX?: number;
  centerY?: number;
}

export type IPadding = number | string | number[];

// Shape types
export type IShapeStyle = Partial<{
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

// model types (node edge group)
export type IModelStyle = Partial<{
  style: {
    [key: string]: IShapeStyle
  };
  stateStyles: {
    [key: string]: IShapeStyle;
  };
  // loop edge config
  loopCfg: {
    dist?: number;
    position?: string;
    // 如果逆时针画，交换起点和终点
    clockwise?: boolean;
  };
}>

export type IModelConfig = INodeConfig & IEdgeConfig

export interface INodeConfig extends IModelStyle {
  id: string;
  label?: string;
  groupId?: string;
  description?: string;
  x?: number;
  y?: number;
  shape?: string;
}

export interface IEdgeConfig extends IModelStyle  {
  source: string;
  target: string;
  label?: string;
  sourceNode?: INode;
  targetNode?: INode;
  startPoint?: IPoint;
  endPoint?: IPoint;
  controlPoints?: IPoint[];
  shape?: string;
}

export interface IGroupConfig {
  id: string;
  parentId?: string;
  [key: string]: string | IModelStyle;
}

export interface IGroupNodeIds {
  [key: string]: string[];
}

export interface IGraphData {
  nodes?: INodeConfig[];
  edges?: IEdgeConfig[];
  groups?: IGroupConfig[];
}

export interface ITreeGraphData {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  children?: ITreeGraphData[];
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

export type IBehaviorOpation<U> = {
  [T in keyof U]:
  T extends GetEvents ? () => { [key in G6Event]?: string } :
  T extends ShouldBegin ? (cfg?: IModelConfig) => boolean :
  T extends ShouldEnd ? (cfg?: IModelConfig) => boolean :
  T extends ShouldUpdate ? (cfg?: IModelConfig) => boolean :
  T extends Bind ? (graph: IGraph) => void :
  T extends Unbind ? (graph: IGraph) => void :
  (...args: DefaultBehaviorType[]) => unknown;
}

export type IEvent = Record<G6Event, string>

export interface IG6GraphEvent extends GraphEvent {
  item: IItem;
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