import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { BBox } from '@antv/g-base/lib/types';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import { IGraph } from '../src/interface/graph';
import { IItem, INode } from '../src/interface/item'

// Math types
export interface IPoint {
  x: number;
  y: number;
  // 获取连接点时使用
  anchorIndex?: number;
}

export type IMatrix = number[];

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
  style: {
    [key: string]: ShapeStyle
  };
  stateStyles: {
    [key: string]: ShapeStyle;
  };
  // loop edge config
  loopCfg: {
    dist?: number;
    position?: string;
    // 如果逆时针画，交换起点和终点
    clockwise?: boolean;
  };
}>

export type Easeing =
  'easeLinear'
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
  x?: number;
  y?: number;
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
  sourceNode?: INode;
  targetNode?: INode;
  startPoint?: IPoint;
  endPoint?: IPoint;
  controlPoints?: IPoint[];
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
}
