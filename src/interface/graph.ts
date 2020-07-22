import EventEmitter from '@antv/event-emitter';
import { Point } from '@antv/g-base/lib/types';
import Graph from '../graph/graph';
import {
  EdgeConfig,
  GraphData,
  Item,
  ITEM_TYPE,
  ModelConfig,
  NodeConfig,
  Padding,
  ShapeStyle,
  TreeGraphData,
  LayoutConfig,
  GraphOptions,
  ModeOption,
  ModeType,
  ComboConfig,
  GraphAnimateConfig,
  StackData
} from '../types';
import { IEdge, INode, ICombo } from './item';
import PluginBase from '../plugins/base';
import Stack from '../algorithm/structs/stack';

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
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  showItem(item: Item | string, stack?: boolean): void;

  /**
   * 隐藏元素
   * @param {Item} item 指定元素
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  hideItem(item: Item | string, stack?: boolean): void;

  /**
   * 仅画布重新绘制
   */
  paint(): void;

  /**
   * 自动重绘
   */
  autoPaint(): void;

  /**
   * 刷新元素
   * @param {Item} item 元素id或元素实例
   */
  refreshItem(item: Item | string): void;

  /**
   * 将元素移动到视口中心
   * @param {Item} item 指定元素
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */
  focusItem(item: Item | string, animate?: boolean, animateCfg?: GraphAnimateConfig): void;

  /**
   * 调整视口适应视图
   * @param {Padding} padding 四周围边距
   */
  fitView(padding?: Padding): void;

  /**
   * 调整视口适应视图，不缩放，仅将图 bbox 中心对齐到画布中心
   */
  fitCenter(): void;

  /**
   * 伸缩视口到一固定比例
   * @param {number} toRatio 伸缩比例
   * @param {Point} center 以center的x, y坐标为中心缩放
   */
  zoomTo(toRatio: number, center?: Point): void;

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  removeItem(item: Item | string, stack?: boolean): void;

  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  remove(item: Item | string, stack?: boolean): void;

  /**
   * 新增元素 或 节点分组
   * @param {string} type 元素类型(node | edge | group)
   * @param {ModelConfig} model 元素数据模型
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @return {Item} 元素实例
   */
  addItem(type: ITEM_TYPE, model: ModelConfig, stack?: boolean): Item;

  add(type: ITEM_TYPE, model: ModelConfig, stack?: boolean): Item;

  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {EdgeConfig | NodeConfig} cfg 需要更新的数据
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */
  updateItem(item: Item | string, cfg: Partial<NodeConfig> | EdgeConfig, stack?: boolean): void;

  update(item: Item | string, cfg: Partial<NodeConfig> | EdgeConfig, stack?: boolean): void;

  /**
   * 更新 Combo 结构，例如移动子树等
   * @param {string | INode | ICombo} item 需要被更新的 Combo 或 节点 id
   * @param {string | undefined} parentId 新的父 combo id，undefined 代表没有父 combo
   */
  updateComboTree(item: string | INode | ICombo, parentId?: string | undefined): void;

  /**
   * 解散 combo
   * @param {String | ICombo} item 需要被解散的 Combo item 或 id
   */
  uncombo(item: string | ICombo): void;

  /**
   * 根据已经存在的节点或 combo 创建新的 combo
   * @param combo combo ID 或 Combo 配置
   * @param elements 添加到 Combo 中的元素，包括节点和 combo
   */
  createCombo(combo: string | ComboConfig, elements: string[]): void;

  /**
   * 设置元素状态
   * @param {Item} item 元素id或元素实例
   * @param {string} state 状态名称
   * @param {boolean} value 是否启用状态或状态值
   */
  setItemState(item: Item | string, state: string, value: string | boolean): void;

  /**
   * 将指定状态的优先级提升为最高优先级
   * @param {Item} item 元素id或元素实例
   * @param state 状态名称
   */
  priorityState(item: Item | string, state: string): void;

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
   * 获取当前图中所有 combo 的实例
   */
  getCombos(): ICombo[];

  /**
   * 获取节点所有的邻居节点，有向图中效果同无向图
   *
   * @param {(string | INode)} node 节点 ID 或实例
   * @returns {INode[]}
   * @memberof IGraph
   */
  getNeighbors(node: string | INode, type?: 'source' | 'target' | undefined): INode[];

  /**
   * 获取指定 combo 中所有的节点
   * @param comboId Combo ID 或 combo 实例
   */
  getComboChildren(combo: string | ICombo): { nodes: INode[], combos: ICombo[] };

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
   * @param {string | ModeOption | ModeType[]} behaviors 添加的行为
   * @param {string | string[]} modes 添加到对应的模式
   * @return {Graph} Graph
   */
  addBehaviors(behaviors: string | ModeOption | ModeType[], modes: string | string[]): Graph;

  /**
   * 移除行为
   * @param {string | ModeOption | ModeType[]} behaviors 移除的行为
   * @param {string | string[]} modes 从指定的模式中移除
   * @return {Graph} Graph
   */
  removeBehaviors(behaviors: string | ModeOption | ModeType[], modes: string | string[]): Graph;

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
   * @param {GraphData | TreeGraphData} data 源数据
   * @param {boolean} 是否入栈，默认为true
   * @return {object} this
   */
  changeData(data?: GraphData | TreeGraphData, stack?: boolean): Graph;

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
   * 设置每个 combo 的配置
   * @param comboFn 指定每个 combo 的配置
   */
  combo(comboFn: (config: ComboConfig) => Partial<ComboConfig>): void;

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
   * 收起指定的 Combo
   * @param comboId combo ID 或 combo 实例
   */
  collapseCombo(combo: string | ICombo): void;

  /**
   * 展开指定的 Combo
   * @param combo combo ID 或 combo 实例
   */
  expandCombo(combo: string | ICombo): void;

  /**
   * 展开或收缩指定的 Combo
   * @param comboId combo ID 或 combo 实例
   */
  collapseExpandCombo(combo: string | ICombo): void;

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
   * 根据节点的 bbox 更新所有 combos 的绘制，包括 combos 的位置和范围
   */
  updateCombos(): void;

  /**
   * 获取 undo stack
   */
  getUndoStack(): Stack;

  /**
   * 获取 redo stack
   */
  getRedoStack(): Stack;

  /**
   * 获取 undo 和 redo 栈的数据
   */
  getStackData(): {
    undoStack: StackData[],
    redoStack: StackData[]
  }

  /**
   * 清空 undo stack & redo stack
   */
  clearStack(): void;

  /**
   * 将操作类型和操作数据入栈
   * @param action 操作类型
   * @param data 入栈的数据
   * @param stackType 入栈的类型
   */
  pushStack(action?: string, data?: unknown, stackType?: 'redo' | 'undo'): void;

  /**
   * 根据节点的 bbox 更新 combo 及其祖先 combos 的绘制，包括 combos 的位置和范围
   * @param combo 需要更新的 combo
   */
  updateCombo(combo: string | ICombo): void;

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
  layoutAnimate(
    data: TreeGraphData,
    onFrame?: (
      item: Item,
      ratio: number,
      originAttrs?: ShapeStyle,
      data?: TreeGraphData,
    ) => unknown,
  ): void;

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