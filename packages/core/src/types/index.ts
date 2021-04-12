/* eslint @typescript-eslint/no-use-before-define: 0 */
import { IGroup, Event as GraphEvent, BBox, AnimateCfg, ICanvas, IShape } from '@antv/g-base';
import Node from '../item/node';
import { IAbstractGraph } from '../interface/graph';
import { IEdge, INode, ICombo } from '../interface/item';
import { ILabelConfig } from '../interface/shape';

export * from '../interface';

// Node Edge Combo 实例
export type Item = INode | IEdge | ICombo;

export interface IG6GraphEvent extends GraphEvent {
  item: Item | null;
  canvasX: number;
  canvasY: number;
  clientX: number;
  clientY: number;
  x: number;
  y: number;
  wheelDelta: number;
  detail: number;
  key?: string;
  target: IShapeBase & ICanvas;
  [key: string]: unknown;
}

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
  lineDash: number[];
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
  fontSize: number;

  keepVisualSize: boolean;
  // support more properties
  [key: string]: any;
}>;

export interface IShapeBase extends IShape {
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
  gpuEnabled?: boolean;
  workerEnabled?: boolean;
  // 只有当 workerEnabled 为 true 时才生效
  workerScriptURL?: string;
  onLayoutEnd?: () => void;
  [key: string]: unknown;
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
  enableDebounce?: boolean;
  allowDragOnItem?: boolean;
  optimizeZoom?: number;
  multiple?: boolean;
  activeState?: string;
  inactiveState?: string;
  comboActiveState?: string;
  selectedState?: string;
  onlyChangeComboSize?: boolean;
  includeEdges?: boolean;
  direction?: 'x' | 'y';
  scalableRange?: number;
  offset?: number;
  sensitivity?: number;
  fixSelectedItems?: Partial<{
    fixAll: boolean;
    fixLineWidth: boolean;
    fixLabel: boolean;
    fixState: string;
  }>;
  key?: string | undefined;
  edgeConfig?: EdgeConfig;
  functionName?: string;
  functionParams?: any[];
  relayout?: boolean;
  brushStyle?: object;
  zoomKey?: 'shift' | 'ctrl' | 'alt' | 'control';
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

export interface StateStyles {
  [key: string]:
    | ShapeStyle
    | {
        [key: string]: ShapeStyle;
      };
}

// model types (node edge group)
export type ModelStyle = Partial<{
  [key: string]: unknown;
  style: ShapeStyle;
  stateStyles: StateStyles;
}>;

export interface GraphOptions {
  /**
   * 图的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象
   */
  container: string | HTMLElement;
  /**
   * 指定画布宽度，单位为 'px'，可选，默认为容器宽度
   */
  width?: number;
  /**
   * 指定画布高度，单位为 'px'，可选，默认为容器宽度
   */
  height?: number;
  /**
   * renderer canvas or svg
   */
  renderer?: string;

  fitView?: boolean;

  fitCenter?: boolean;

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
    type: string;
    size: number | number[];
    color: string;
  }> &
    ModelStyle;

  /**
   * 默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
   */
  defaultEdge?: Partial<{
    type: string;
    size: number | number[];
    color: string;
  }> &
    ModelStyle;

  /**
   * Combo 默认配置
   */
  defaultCombo?: Partial<{
    type: string;
    size: number | number[];
    color: string;
  }> &
    ModelStyle;

  nodeStateStyles?: StateStyles;

  edgeStateStyles?: StateStyles;

  // Combo 状态样式
  comboStateStyles?: StateStyles;

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

  /**
   * 是否启用 stack，即是否开启 redo & undo 功能
   */
  enabledStack?: boolean;

  /**
   * redo & undo 最大步数, 只有当 enabledStack 为 true 时才起作用
   */
  maxStep?: number;

  /**
   * 存储图上的 tooltip dom，方便销毁
   */
  tooltips?: [];

  pixelRatio?: number;
}

export type LabelStyle = Partial<{
  rotate: number;
  textAlign: 'center' | 'start' | 'end' | 'left' | 'right';
  angle: number;
  x: number;
  y: number;
  text: string;
  stroke: string | null;
  opacity: number;
  fontSize: number;
  fontStyle: 'normal' | 'italic' | 'oblique';
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  fill: string | null;
  rotateCenter: string;
  lineWidth: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  position: string;
  textBaseline: 'top' | 'middle' | 'bottom' | 'hanging' | 'alphabetic' | 'ideographic';
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
  // 节点或边的类型
  type?: string;
  label?: string | LabelStyle;
  labelCfg?: ILabelConfig;
  x?: number;
  y?: number;
  size?: number | number[];
  color?: string;
  anchorPoints?: number[][];
  startPoint?: {
    x: number;
    y: number;
  };
  endPoint?: {
    x: number;
    y: number;
  };
  visible?: boolean;
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
  stateStyles?: StateStyles;
  [key: string]: unknown;
}

export interface NodeConfig extends ModelConfig {
  id: string;
  groupId?: string;
  comboId?: string;
  children?: TreeGraphData[];
  description?: string;
  descriptionCfg?: {
    style?: object;
    [key: string]: any;
  };
  img?: string;
  innerR?: number;
  direction?: string;
  preRect?: {
    show?: boolean;
    [key: string]: any;
  };
  logoIcon?: {
    show?: boolean;
    [key: string]: any;
  };
  stateIcon?: {
    show?: boolean;
    [key: string]: any;
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
    [key: string]: any;
  };
  icon?: {
    show?: boolean;
    // icon的地址，字符串类型
    img?: string;
    text?: string;
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
}

export interface ComboTree {
  id: string;
  label?: string | LabelStyle;
  children?: ComboTree[];
  depth?: number;
  parentId?: string;
  removed?: boolean;
  itemType?: 'node' | 'combo';
  [key: string]: unknown;
}

export interface ComboConfig extends ModelConfig {
  id: string;
  parentId?: string;
  children?: ComboTree[];
  depth?: number;
  padding?: number | number[];
  collapseIcon?: Partial<{
    show: boolean;
    collapseSymbol: any;
    expandSymbol: any;
    r: number;
    lineWidth: number;
    stroke: string;
    offsetX: number;
    offsetY: number;
  }>;
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
  curveOffset?: number | number[];
  minCurveOffset?: number | number[];
  // loop edge config
  loopCfg?: LoopConfig;
  labelCfg?: ILabelConfig;
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

export interface GraphData {
  nodes?: NodeConfig[];
  edges?: EdgeConfig[];
  combos?: ComboConfig[];
  [key: string]: any;
}

export interface GraphAnimateConfig extends AnimateCfg {
  /**
   * 回调函数，用于自定义节点运动路径。
   */
  onFrame?: (item: Item, ratio: number, data?: GraphData, originAttrs?: ShapeStyle) => unknown;
}

export interface GroupNodeIds {
  [key: string]: string[];
}

// Behavior type file
export enum G6Event {
  // common events
  CLICK = 'click',
  DBLCLICK = 'dblclick',
  MOUSEDOWN = 'mousedown',
  MOUDEUP = 'mouseup',
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
  BLUR = 'blur',

  // touch events
  TOUCHSTART = 'touchstart',
  TOUCHMOVE = 'touchmove',
  TOUCHEND = 'touchend',

  // node events
  NODE_CONTEXTMENU = 'node:contextmenu',
  NODE_CLICK = 'node:click',
  NODE_DBLCLICK = 'node:dblclick',
  NODE_MOUSEDOWN = 'node:mousedown',
  NODE_MOUSEUP = 'node:mouseup',
  NODE_MOUSEENTER = 'node:mouseenter',
  NODE_MOUSELEAVE = 'node:mouseleave',
  NODE_MOUSEMOVE = 'node:mousemove',
  NODE_MOUSEOUT = 'node:mouseout',
  NODE_MOUSEOVER = 'node:mouseover',
  NODE_DROP = 'node:drop',
  NODE_DRAGOVER = 'node:dragover',
  NODE_DRAGENTER = 'node:dragenter',
  NODE_DRAGLEAVE = 'node:dragleave',
  NODE_DRAGSTART = 'node:dragstart',
  NODE_DRAG = 'node:drag',
  NODE_DRAGEND = 'node:dragend',
  // combo, extends from nodes
  COMBO_CONTEXTMENU = 'combo:contextmenu',
  COMBO_CLICK = 'combo:click',
  COMBO_DBLCLICK = 'combo:dblclick',
  COMBO_MOUSEDOWN = 'combo:mousedown',
  COMBO_MOUSEUP = 'combo:mouseup',
  COMBO_MOUSEENTER = 'combo:mouseenter',
  COMBO_MOUSELEAVE = 'combo:mouseleave',
  COMBO_MOUSEMOVE = 'combo:mousemove',
  COMBO_MOUSEOUT = 'combo:mouseout',
  COMBO_MOUSEOVER = 'combo:mouseover',
  COMBO_DROP = 'combo:drop',
  COMBO_DRAGOVER = 'combo:dragover',
  COMBO_DRAGENTER = 'combo:dragenter',
  COMBO_DRAGLEAVE = 'combo:dragleave',
  COMBO_DRAGSTART = 'combo:dragstart',
  COMBO_DRAG = 'combo:drag',
  COMBO_DRAGEND = 'combo:dragend',

  // edge events
  EDGE_CONTEXTMENU = 'edge:contextmenu',
  EDGE_CLICK = 'edge:click',
  EDGE_DBLCLICK = 'edge:dblclick',
  EDGE_MOUSEDOWN = 'edge:mousedown',
  EDGE_MOUSEUP = 'edge:mouseup',
  EDGE_MOUSEENTER = 'edge:mouseenter',
  EDGE_MOUSELEAVE = 'edge:mouseleave',
  EDGE_MOUSEMOVE = 'edge:mousemove',
  EDGE_MOUSEOUT = 'edge:mouseout',
  EDGE_MOUSEOVER = 'edge:mouseover',
  EDGE_DROP = 'edge:drop',
  EDGE_DRAGOVER = 'edge:dragover',
  EDGE_DRAGENTER = 'edge:dragenter',
  EDGE_DRAGLEAVE = 'edge:dragleave',

  // canvas events
  CANVAS_CONTEXTMENU = 'canvas:contextmenu',
  CANVAS_CLICK = 'canvas:click',
  CANVAS_DBLCLICK = 'canvas:dblclick',
  CANVAS_MOUSEDOWN = 'canvas:mousedown',
  CANVAS_MOUSEUP = 'canvas:mouseup',
  CANVAS_MOUSEENTER = 'canvas:mouseenter',
  CANVAS_MOUSELEAVE = 'canvas:mouseleave',
  CANVAS_MOUSEMOVE = 'canvas:mousemove',
  CANVAS_MOUSEOUT = 'canvas:mouseout',
  CANVAS_MOUSEOVER = 'canvas:mouseover',
  CANVAS_DROP = 'canvas:drop',
  CANVAS_DRAGENTER = 'canvas:dragenter',
  CANVAS_DRAGLEAVE = 'canvas:dragleave',
  CANVAS_DRAGSTART = 'canvas:dragstart',
  CANVAS_DRAG = 'canvas:drag',
  CANVAS_DRAGEND = 'canvas:dragend',

  // timing events
  BEFORERENDER = 'beforerender',
  AFTERRENDER = 'afterrender',
  BEFOREADDITEM = 'beforeadditem',
  AFTERADDITEM = 'afteradditem',
  BEFOREREMOVEITEM = 'beforeremoveitem',
  AFTERREMOVEITEM = 'afterremoveitem',
  BEFOREUPDATEITEM = 'beforeupdateitem',
  AFTERUPDATEITEM = 'afterupdateitem',
  BEFOREITEMVISIBILITYCHANGE = 'beforeitemvisibilitychange',
  AFTERITEMVISIBILITYCHANGE = 'afteritemvisibilitychange',
  BEFOREITEMSTATECHANGE = 'beforeitemstatechange',
  AFTERITEMSTATECHANGE = 'afteritemstatechange',
  BEFOREITEMREFRESH = 'beforeitemrefresh',
  AFTERITEMREFRESH = 'afteritemrefresh',
  BEFOREITEMSTATESCLEAR = 'beforeitemstatesclear',
  AFTERITEMSTATESCLEAR = 'afteritemstatesclear',
  BEFOREMODECHANGE = 'beforemodechange',
  AFTERMODECHANGE = 'aftermodechange',
  BEFORELAYOUT = 'beforelayout',
  AFTERLAYOUT = 'afterlayout',
  BEFORECREATEEDGE = 'beforecreateedge',
  AFTERCREATEEDGE = 'aftercreateedge',
  BEFOREGRAPHREFRESHPOSITION = 'beforegraphrefreshposition',
  AFTERGRAPHREFRESHPOSITION = 'aftergraphrefreshposition',
  BEFOREGRAPHREFRESH = 'beforegraphrefresh',
  AFTERGRAPHREFRESH = 'aftergraphrefresh',
  BEFOREANIMATE = 'beforeanimate',
  AFTERANIMATE = 'afteranimate',
  BEFOREPAINT = 'beforepaint',
  AFTERPAINT = 'afterpaint',
  BEFORECOLLAPSEEXPANDCOMBO = 'beforecollapseexpandcombo',
  AFTERCOLLAPSEEXPANDCOMBO = 'aftercollapseexpandcombo',

  GRAPHSTATECHANGE = 'graphstatechange',
  AFTERACTIVATERELATIONS = 'afteractivaterelations',
  NODESELECTCHANGE = 'nodeselectchange',
  TOOLTIPCHANGE = 'tooltipchange',
  WHEELZOOM = 'wheelzoom',
  VIEWPORTCHANGE = 'viewportchange',
  DRAGNODEEND = 'dragnodeend',
  STACKCHANGE = 'stackchange',
}

export type DefaultBehaviorType = IG6GraphEvent | string | number | object;

export interface BehaviorOption {
  getEvents: () => {
    [key in G6Event]?: string;
  };
  getDefaultCfg?: () => object;
  shouldBegin?: (e?: IG6GraphEvent) => boolean;
  shouldUpdate?: (e?: IG6GraphEvent) => boolean;
  shouldEnd?: (e?: IG6GraphEvent) => boolean;
  bind?: (e: IAbstractGraph) => void;
  unbind?: (e: IAbstractGraph) => void;
  [key: string]: unknown;
}

export type IEvent = Record<G6Event, string>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type ITEM_TYPE = 'node' | 'edge' | 'combo' | 'vedge';

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
  enter?: (param: { current: INode; previous: INode }) => void;
  leave?: (param: { current: INode; previous?: INode }) => void;
  allowTraversal?: (param: { previous?: INode; current?: INode; next: INode }) => boolean;
}

// 栈中数据格式
export interface StackData {
  action: string;
  data: GraphData;
}

export interface BubblesetCfg {
  morphBuffer?: number; // DEFAULT_NODE_R0; the amount of space to move the virtual edge when wrapping around obstacles
  pixelGroupSize?: number; // the resolution of the algorithm in square pixels, 4 by default
  maxMarchingIterations?: number; // number of times to refine the boundary, 100 by default
  maxRoutingIterations?: number; // number of times to run the algorithm to refine the path finding in difficult areas
  nodeR0?: number; // the distance from nodes which energy is 1 (full influence)
  nodeR1?: number; // the distance from nodes at which energy is 0 (no influence)
  edgeR0?: number; // the distance from edges at which energy is 1 (full influence)
  edgeR1?: number; // the distance from edges at which energy is 0 (no influence)
  nodeInfluenceFactor?: number; // node influence factor
  negativeNodeInfluenceFactor?: number; // negativeNode influence factor
  edgeInfluenceFactor?: number; // edge influence factor
  memberInfluenceFactor?: number; // member influence factor
  nonMemberInfluenceFactor?: number; // nonMember influence factor
}

export type TimeBarType = 'trend' | 'simple' | 'tick';

export interface HullCfg {
  id: string;
  members?: Item[] | string[]; // 节点实例或节点 Id 数组
  nonMembers?: Item[] | string[];
  group?: IGroup;
  type?: string; // 'round-convex'(圆角凸包) /'smooth-convex'(平滑凸包) / 'bubble'(平滑凹包),
  padding?: number; // 轮廓边缘和内部成员间距
  style?: {
    fill?: string;
    stroke?: string;
    opacity?: number;
  };
  bubbleCfg?: BubblesetCfg; // 用于更精细控制bubble的效果（点和边轮廓的松弛程度，轮廓粒度），一般不需要配置
  update?: string;
}
