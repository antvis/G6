import EventEmitter from '@antv/event-emitter';
import { AnimateCfg, Point } from '@antv/g-base/lib/types';
import Graph from '../graph/graph';
import { EdgeConfig, GraphData, IG6GraphEvent, Item, ITEM_TYPE, ModelConfig, ModelStyle, NodeConfig, Padding, ShapeStyle, TreeGraphData, LayoutConfig } from '../types';
import { IEdge, INode } from './item';
import PluginBase from '../plugins/base';

export interface IModeOption {
  type: string;
  delegate?: boolean;
  delegateStyle?: object;
  updateEdge?: boolean;
  trigger?: string;
  enableDelegate?: boolean;
  maxZoom?: number;
  minZoom?: number;
  multiple?: boolean;
  selectedState?: string;
  includeEdges?: boolean;
  shouldUpdate?: (e: IG6GraphEvent) => boolean;
  shouldBegin?: (e: IG6GraphEvent) => boolean;
  shouldEnd?: (e: IG6GraphEvent) => boolean;
  onChange?: (item?: Item, judge?: boolean) => unknown;
  onSelect?: (selectedNodes?: Item[], selectedEdges?: Item[]) => unknown;
  onDeselect?: (selectedNodes?: Item[], selectedEdges?: Item[]) => unknown;
  formatText?: (data: {
    [key: string]: unknown
  }) => string;
}

export type IModeType = string | IModeOption

export interface IMode {
  default?: IModeType[];
  [key: string]: IModeType[] | undefined;
}

export interface ILayoutOptions {
  type: string;
  // TODO 这里需要补充完善布局的配置
  [key: string]: any;
}

export interface GraphAnimateConfig extends AnimateCfg {
  /**
   * 回调函数，用于自定义节点运动路径。
   */
  onFrame?: (item: Item, ratio: number, data?: GraphData, originAttrs?: ShapeStyle) => unknown;
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
   * 渲染引擎，支持canvas和svg。
   */
  renderer?: 'canvas' | 'svg';

  fitView?: boolean;

  layout?: ILayoutOptions;

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
      [key: string]: ShapeStyle
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
  modes?: IMode;

  /**
   * 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
   */
  defaultNode?: {
    shape?: string;
    type?: string;
    size?: number | number[];
    color?: string;
  } & ModelStyle;

  /**
   * 默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
   */
  defaultEdge?: {
    shape?: string;
    type?: string;
    size?: number | number[];
    color?: string;
  } & ModelStyle;

  nodeStateStyles?: ModelStyle;

  edgeStateStyles?: ModelStyle;

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

// Graph 配置项中 state 的类型
export interface IStates {
  [key: string]: INode[]
}
export interface IGraph extends EventEmitter {
  getDefaultCfg(): Partial<GraphOptions>;
  get<T = any>(key: string): T;
  set<T = any>(key: string | object, value?: T): Graph;
  findById(id: string): Item;
  translate(dx: number, dy: number): void;
  zoom(ratio: number, center?: Point): void;

  /**
   * 将屏幕坐标转换为视口坐标
   * @param {number} clientX 屏幕 x 坐标
   * @param {number} clientY 屏幕 y 坐标
   * @return {Point} 视口坐标
   */
  getPointByClient(clientX: number, clientY: number): Point;

  /**
   * 将视口坐标转换为屏幕坐标
   * @param {number} x 视口x坐标
   * @param {number} y 视口y坐标
   * @return {object} 视口坐标
   */
  getClientByPoint(x: number, y: number): Point;

  /**
   * 将画布坐标转换为视口坐标
   * @param {number} canvasX 画布 x 坐标
   * @param {number} canvasY 画布 y 坐标
   * @return {Point} 视口坐标
   */
  getPointByCanvas(canvasX: number, canvasY: number): Point;

  /**
   * 将视口坐标转换为画布坐标
   * @param {number} x 视口 x 坐标
   * @param {number} y 视口 y 坐标
   * @return {Point} 画布坐标
   */
  getCanvasByPoint(x: number, y: number): Point;

  /**
   * 设置是否在更新/刷新后自动重绘
   * @param {boolean} auto 自动重绘
   */
  setAutoPaint(auto: boolean): void;

  /**
   * 显示元素
   * @param {Item} item 指定元素
   */
  showItem(item: Item | string): void;

  /**
   * 隐藏元素
   * @param {Item} item 指定元素
   */
  hideItem(item: Item | string): void;

  /**
   * 仅画布重新绘制
   */
  paint(): void;

  /**
   * 刷新元素
   * @param {Item} item 元素id或元素实例
   */
  refreshItem(item: Item | string): void;

  /**
   * 将元素移动到视口中心
   * @param {Item} item 指定元素
   */
  focusItem(item: Item | string): void;

  /**
   * 调整视口适应视图
   * @param {Padding} padding 四周围边距
   */
  fitView(padding?: Padding): void;

  /**
   * 伸缩视口到一固定比例
   * @param {number} toRatio 伸缩比例
   * @param {Point} center 以center的x, y坐标为中心缩放
   */
  zoomTo(toRatio: number, center?: Point): void;

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   */
  removeItem(item: Item | string): void;

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   */
  remove(item: Item | string): void;

  /**
   * 新增元素 或 节点分组
   * @param {string} type 元素类型(node | edge | group)
   * @param {ModelConfig} model 元素数据模型
   * @return {Item} 元素实例
   */
  addItem(type: ITEM_TYPE, model: ModelConfig): Item;

  add(type: ITEM_TYPE, model: ModelConfig): Item;

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {EdgeConfig | NodeConfig} cfg 需要更新的数据
   */
  updateItem(item: Item | string, cfg: EdgeConfig | NodeConfig): void;

  update(item: Item | string, cfg: EdgeConfig | NodeConfig): void;

  /**
   * 设置元素状态
   * @param {Item} item 元素id或元素实例
   * @param {string} state 状态
   * @param {boolean} enabled 是否启用状态
   */
  setItemState(item: Item | string, state: string, enabled: boolean): void;

  /**
   * 设置视图初始化数据
   * @param {GraphData} data 初始化数据
   */
  data(data?: GraphData | TreeGraphData): void;

  /**
   * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
   */
  refresh(): void;

  /**
   * 根据 graph 上的 animateCfg 进行视图中节点位置动画接口
   */
  positionsAnimate(): void;

  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */
  refreshPositions(): void;

  /**
   * 根据data接口的数据渲染视图
   */
  render(): void;

  /**
   * 获取当前图中所有节点的item实例
   */
  getNodes(): INode[];

  /**
   * 获取当前图中所有边的item实例
   */
  getEdges(): IEdge[];

  /**
   * 获取当前视口伸缩比例
   * @return {number} 比例
   */
  getZoom(): number;

  /**
   * 获取当前的行为模式
   */
  getCurrentMode(): string;

  /**
   * 切换行为模式
   * @param {string} mode 指定模式
   */
  setMode(mode: string): Graph;

  isAnimating(): boolean;

  stopAnimate(): void;

  /**
   * 新增行为
   * @param {string | IModeOption | IModeType[]} behaviors 添加的行为
   * @param {string | string[]} modes 添加到对应的模式
   * @return {Graph} Graph
   */
  addBehaviors(behaviors: string | IModeOption | IModeType[], modes: string | string[]): Graph;

  /**
   * 移除行为
   * @param {string | IModeOption | IModeType[]} behaviors 移除的行为
   * @param {string | string[]} modes 从指定的模式中移除
   * @return {Graph} Graph
   */
  removeBehaviors(behaviors: string | IModeOption | IModeType[], modes: string | string[]): Graph;

  /**
   * 清除画布元素
   */
  clear(): Graph;

  /**
   * 根据数据渲染群组
   * @param {GraphData} data 渲染图的数据
   * @param {string} groupType group类型
   */
  renderCustomGroup(data: GraphData, groupType: string): void;

  /**
   * 接收数据进行渲染
   * @Param {GraphData} data 初始化数据
   */
  read(data: GraphData): void;

  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {GraphData} data 源数据
   * @return {object} this
   */
  changeData(data?: GraphData | TreeGraphData): Graph;

  /**
   * 导出图数据
   * @return {GraphData} data
   */
  save(): TreeGraphData | GraphData;

  /**
   * 改变画布大小
   * @param  {number} width  画布宽度
   * @param  {number} height 画布高度
   * @return {Graph} this
   */
  changeSize(width: number, height: number): Graph;

  /**
   * 清理元素多个状态
   * @param {string|Item} item 元素id或元素实例
   * @param {string | string[]} states 状态
   */
  clearItemStates(item: Item | string, states?: string | string[]): void;

  /**
   * 设置各个节点样式，以及在各种状态下节点 keyShape 的样式。
   * 若是自定义节点切在各种状态下
   * graph.node(node => {
   *  return {
   *    {
   *       type: 'rect',
   *      label: node.id,
   *       style: { fill: '#666' },
   *      stateStyles: {
   *         selected: { fill: 'blue' },
   *         custom: { fill: 'green' }
   *       }
   *     }
   *  }
   * });
   * @param {function} nodeFn 指定每个节点样式
   */
  node(nodeFn: (config: NodeConfig) => Partial<NodeConfig>): void;

  /**
   * 设置各个边样式
   * @param {function} edgeFn 指定每个边的样式,用法同 node
   */
  edge(edgeFn: (config: EdgeConfig) => Partial<EdgeConfig>): void;
  /**
   * 平移画布到某点
   * @param {number} x 水平坐标
   * @param {number} y 垂直坐标
   */
  moveTo(x: number, y: number): void;

  /**
   * 根据对应规则查找单个元素
   * @param {ITEM_TYPE} type 元素类型(node | edge | group)
   * @param {(item: T, index: number) => T} fn 指定规则
   * @return {T} 元素实例
   */
  find<T extends Item>(type: ITEM_TYPE, fn: (item: T, index?: number) => boolean): T | undefined;

  /**
   * 查找所有满足规则的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} fn 指定规则
   * @return {array} 元素实例
   */
  findAll<T extends Item>(type: ITEM_TYPE, fn: (item: T, index?: number) => boolean): T[];

  /**
   * 查找所有处于指定状态的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} state z状态
   * @return {object} 元素实例
   */
  findAllByState<T extends Item>(type: ITEM_TYPE, state: string): T[];

  /**
   * 返回图表的 dataUrl 用于生成图片
   */
  toDataURL(): string;

  /**
   * 画布导出图片
   * @param {String} name 图片的名称
   */
  downloadImage(name: string): void;

  // TODO 需要添加布局配置类型
  /**
   * 更换布局配置项
   * @param {object} cfg 新布局配置项
   * 若 cfg 含有 type 字段或为 String 类型，且与现有布局方法不同，则更换布局
   * 若 cfg 不包括 type ，则保持原有布局方法，仅更新布局配置项
   */
  updateLayout(cfg: LayoutConfig): void;

  /**
   * 重新以当前示例中配置的属性进行一次布局
   */
  layout(): void;

  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  addPlugin(plugin: PluginBase): void;

  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  removePlugin(plugin: PluginBase): void;

  /**
   * 收起分组
   * @param {string} groupId 分组ID
   */
  collapseGroup(groupId: string): void;

  /**
   * 展开分组
   * @param {string} groupId 分组ID
   */
  expandGroup(groupId: string): void;

  /**
   * 销毁画布
   */
  destroy(): void;
}

export interface ITreeGraph extends IGraph {
  /**
   * 添加子树到对应 id 的节点
   * @param {TreeGraphData} data 子树数据模型
   * @param {string | Item} parent 子树的父节点id
   */
  addChild(data: TreeGraphData, parent: string | Item): void;

  /**
   * 更新源数据，差量更新子树
   * @param {TreeGraphData} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  updateChild(data: TreeGraphData, parent?: string): void;

  /**
   * 删除子树
   * @param {string} id 子树根节点id
   */
  removeChild(id: string): void;

  /**
   * 根据id获取对应的源数据
   * @param {string} id 元素id
   * @param {TreeGraphData | undefined} parent 从哪个节点开始寻找，为空时从根节点开始查找
   * @return {TreeGraphData} 对应源数据
   */
  findDataById(id: string, parent?: TreeGraphData | undefined): TreeGraphData | null;

  /**
   * 布局动画接口，用于数据更新时做节点位置更新的动画
   * @param {TreeGraphData} data 更新的数据
   * @param {function} onFrame 定义节点位置更新时如何移动
   */
  layoutAnimate(data: TreeGraphData, onFrame?: (item: Item, ratio: number, originAttrs?: ShapeStyle, data?: TreeGraphData) => unknown): void;

  /**
   * 立即停止布局动画
   */
  stopLayoutAnimate(): void;

  /**
   * 是否在布局动画
   * @return {boolean} 是否有布局动画
   */
  isLayoutAnimating(): boolean;
}