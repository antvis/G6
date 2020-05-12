import GraphEvent from '@antv/g-base/lib/event/graph-event';
import { BBox, AnimateCfg } from '@antv/g-base/lib/types';
import Canvas from '@antv/g-canvas/lib/canvas';
import ShapeBase from '@antv/g-canvas/lib/shape/base';
import Node from '../item/node';
import { IGraph } from '../interface/graph';
import { IEdge, INode, ICombo } from '../interface/item';
import { ILabelConfig } from '../interface/shape';
import GraphVertex from '../algorithm/structs/graph/GraphVertex';

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
  stroke?: string;
  fill?: string;
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
  fontSize: number;
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

export interface LayoutConfig {
  type?: string;
  [key: string]: unknown;
}

export interface GraphAnimateConfig extends AnimateCfg {
  /**
   * 回调函数，用于自定义节点运动路径。
   */
  onFrame?: (item: Item, ratio: number, data?: GraphData, originAttrs?: ShapeStyle) => unknown;
}

export interface ModeOption {
  type: string;
  delegate?: boolean;
  delegateStyle?: object;
  updateEdge?: boolean;
  trigger?: string;
  enableDelegate?: boolean;
  maxZoom?: number;
  minZoom?: number;
  enableOptimize?: boolean;
  optimizeZoom?: number;
  multiple?: boolean;
  activeState?: string;
  comboActiveState?: string;
  selectedState?: string;
  onlyChangeComboSize?: boolean;
  includeEdges?: boolean;
  direction?: 'x' | 'y';
  shouldUpdate?: (e: IG6GraphEvent) => boolean;
  shouldBegin?: (e: IG6GraphEvent) => boolean;
  shouldEnd?: (e: IG6GraphEvent) => boolean;
  onChange?: (item?: Item, judge?: boolean) => unknown;
  onSelect?: (selectedNodes?: Item[], selectedEdges?: Item[]) => unknown;
  onDeselect?: (selectedNodes?: Item[], selectedEdges?: Item[]) => unknown;
  formatText?: (data: { [key: string]: unknown }) => string;
}

export type ModeType = string | ModeOption;

export interface Modes {
  default?: ModeType[];
  [key: string]: ModeType[] | undefined;
}

// Graph 配置项中 state 的类型
export interface States {
  [key: string]: INode[];
}

export interface GraphOptions {
  /**
   * 图的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象
   */
  container: string | HTMLElement;
  /**
   * 指定画布宽度，单位为 'px'
   */
  width: number;
  /**
   * 指定画布高度，单位为 'px'
   */
  height: number;
  /**
   * renderer canvas or svg
   */
  renderer?: string,

  fitView?: boolean;

  layout?: LayoutConfig;

  /**
   * 图适应画布时，指定四周的留白。
   * 可以是一个值, 例如：fitViewPadding: 20
   * 也可以是一个数组，例如：fitViewPadding: [20, 40, 50,20]
   * 当指定一个值时，四边的边距都相等，当指定数组时，数组内数值依次对应 上，右，下，左四边的边距。
   */
  fitViewPadding?: Padding;
  /**
   * 各种元素是否在一个分组内，决定节点和边的层级问题，默认情况下所有的节点在一个分组中，所有的边在一个分组中，当这个参数为 false 时，节点和边的层级根据生成的顺序确定。
   * 默认值：true
   */
  groupByTypes?: boolean;

  // 是否有向图
  directed?: boolean;

  groupStyle?: {
    style?: {
      [key: string]: ShapeStyle;
    };
  };

  /**
   * 当图中元素更新，或视口变换时，是否自动重绘。建议在批量操作节点时关闭，以提高性能，完成批量操作后再打开，参见后面的 setAutoPaint() 方法。
   * 默认值：true
   */
  autoPaint?: boolean;

  /**
   * 设置画布的模式。详情可见G6中的Mode文档。
   */
  modes?: Modes;

  /**
   * 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
   */
  defaultNode?: Partial<{
    shape: string;
    type: string;
    size: number | number[];
    color: string;
  }> & ModelStyle;

  /**
   * 默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
   */
  defaultEdge?: Partial<{
    shape: string;
    type: string;
    size: number | number[];
    color: string;
  }> & ModelStyle;

  /**
   * Combo 默认配置
   */
  defaultCombo?: Partial<{
    type: string;
    size: number | number[];
    color: string;
  }> & ModelStyle;

  nodeStateStyles?: StateStyles;

  edgeStateStyles?: StateStyles;

  // Combo 状态样式
  comboStateStyles?: StateStyles

  /**
   * 向 graph 注册插件。插件机制请见：plugin
   */
  plugins?: any[];
  /**
   * 是否启用全局动画。
   */
  animate?: boolean;

  /**
   * 动画配置项，仅在animate为true时有效。
   */
  animateCfg?: GraphAnimateConfig;
  /**
   * 最小缩放比例
   * 默认值 0.2
   */
  minZoom?: number;
  /**
   * 最大缩放比例
   * 默认值 10
   */
  maxZoom?: number;

  groupType?: string;

  /**
   * Edge 是否连接到节点中间
   */
  linkCenter?: boolean;
}

interface StateStyles {
  [key: string]: ShapeStyle | {
    [key: string]: ShapeStyle
  }
}

// model types (node edge group)
export type ModelStyle = Partial<{
  [key: string]: unknown;
  style: ShapeStyle;
  stateStyles: StateStyles;
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
  label?: string | LabelStyle;
  labelCfg?: ILabelConfig;
  x?: number;
  y?: number;
  size?: number | number[];
  color?: string;
  anchorPoints?: number[][];
}

export interface NodeConfig extends ModelConfig {
  id: string;
  groupId?: string;
  comboId?: string;
  children?: TreeGraphData[];
  description?: string;
  descriptionCfg?: {
    style?: object;
    [key: string]: unknown;
  };
  img?: string;
  innerR?: number;
  direction?: string;
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
    style?: {
      lineWidth?: number;
    };
  };
}

export interface ComboConfig extends ModelConfig {
  id: string;
  parentId?: string;
  children?: ComboTree[];
  depth?: number;
  padding?: number | number[]
  collapseIcon?: Partial<{
    show: boolean;
    collapseSymbol: any;
    expandSymbol: any;
    r: number;
    lineWidth: number;
    stroke: string;
    offsetX: number;
    offsetY: number;
  }>
}

export interface EdgeConfig extends ModelConfig {
  id?: string;
  source?: string;
  target?: string;
  sourceNode?: Node;
  targetNode?: Node;
  startPoint?: IPoint;
  endPoint?: IPoint;
  controlPoints?: IPoint[];
  curveOffset?: number;
  // loop edge config
  loopCfg?: LoopConfig;
  labelCfg?: ILabelConfig;
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
  combos?: ComboConfig[];
}

export interface TreeGraphData {
  id: string;
  label?: string;
  x?: number;
  y?: number;
  children?: TreeGraphData[];
  data?: ModelConfig;
  side?: 'left' | 'right',
  depth?: number;
  collapsed?: boolean;
}

export interface ComboTree {
  id: string;
  label?: string | LabelStyle;
  children?: ComboTree[];
  depth?: number;
  parentId?: string;
  removed?: boolean;
  itemType?: 'node' | 'combo';
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
  NODE_DROP = 'node:drop',
  NODE_DRAGENTER = 'node:dragenter',
  NODE_DRAGLEAVE = 'node:dragleave',

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

  // combo
  COMBO_CLICK = 'combo:click',
  COMBO_CONTEXTMENU = 'combo:contextmenu',
  COMBO_DBLCLICK = 'combo:dblclick',
  COMBO_DRAGSTART = 'combo:dragstart',
  COMBO_DRAG = 'combo:drag',
  COMBO_DRAGEND = 'combo:dragend',
  COMBO_MOUSEENTER = 'combo:mouseenter',
  COMBO_MOUSELEAVE = 'combo:mouseleave',
  COMBO_MOUSEMOVE = 'combo:mousemove',
  COMBO_DROP = 'combo:drop',
  COMBO_DRAGOVER = 'combo:dragover',
  COMBO_DRAGLEAVE = 'combo:dragleave',
  COMBO_DRAGENTER = 'combo:dragenter'
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

// Node Edge Combo 实例
export type Item = INode | IEdge | ICombo;

export type ITEM_TYPE = 'node' | 'edge' | 'combo' | 'group' | 'vedge';

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

// 图算法回调方法接口定义
export interface IAlgorithmCallbacks {
  enterVertex?: (param: { currentVertex: GraphVertex, previousVertex: GraphVertex }) => void;
  leaveVertex?: (param: { currentVertex: GraphVertex, previousVertex?: GraphVertex  }) => void;
  allowTraversal?: (param: { previousVertex?: GraphVertex, currentVertex?: GraphVertex, nextVertex: GraphVertex }) => boolean;
}
