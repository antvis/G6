/* eslint @typescript-eslint/no-use-before-define: 0 */
import { IGroup, Point } from '@antv/g-base';
import {
  IBBox,
  IPoint,
  IShapeBase,
  Item,
  ModelConfig,
  NodeConfig,
  EdgeConfig,
  ModelStyle,
  ShapeStyle,
  Indexable,
  ComboConfig,
  ITEM_TYPE,
  TreeGraphData,
} from '../types';

// item 的配置项
export type IItemBaseConfig = Partial<{
  /**
   * id
   */
  id: string;

  /**
   * 类型
   */
  type: 'item' | 'node' | 'edge' | 'combo' | 'vedge';

  /**
   * data model
   */
  model: ModelConfig;

  /**
   * G Group
   */
  group: IGroup;

  /**
   * is open animate
   */
  animate: boolean;

  /**
   * visible - not group visible
   */
  visible: boolean;

  /**
   * locked - lock node
   */
  locked: boolean;
  /**
   * capture event
   */
  event: boolean;
  /**
   * key shape to calculate item's bbox
   */
  keyShape: IShapeBase;
  /**
   * item's states, such as selected or active
   * @type Array
   */
  states: string[];

  /**
   * Item 的样式
   */
  styles: ModelStyle;

  source: string | Item;
  target: string | Item;

  linkCenter: boolean;
}> &
  Indexable<any>;

export interface IItemBase {
  _cfg: IItemBaseConfig | null;

  destroyed: boolean;

  isItem: () => boolean;

  setOriginStyle: () => void;

  getShapeStyleByName: (name?: string) => ShapeStyle;

  /**
   * 获取当前元素的所有状态
   * @return {Array} 元素的所有状态
   */
  getStates: () => string[];

  /**
   * 当前元素是否处于某状态
   * @param {String} state 状态名
   * @return {Boolean} 是否处于某状态
   */
  hasState: (state: string) => boolean;

  getStateStyle: (state: string) => ShapeStyle;

  getOriginStyle: () => ShapeStyle;

  getCurrentStatesStyle: () => ShapeStyle;

  /**
   * 更改元素状态， visible 不属于这个范畴
   * @internal 仅提供内部类 graph 使用
   * @param {String} state 状态名
   * @param {Boolean} value 节点状态值
   */
  setState: (state: string, value: string | boolean) => void;

  clearStates: (states?: string | string[]) => void;

  /**
   * 节点的图形容器
   * @return {G.Group} 图形容器
   */
  getContainer: () => IGroup;

  /**
   * 节点的关键形状，用于计算节点大小，连线截距等
   * @return {IShapeBase} 关键形状
   */
  getKeyShape: () => IShapeBase;

  /**
   * 节点 / 边 / Combo 的数据模型
   * @return {Object} 数据模型
   */
  getModel: () => NodeConfig | EdgeConfig | ComboConfig | TreeGraphData;

  /**
   * 节点类型
   * @return {string} 节点的类型
   */
  getType: () => ITEM_TYPE;

  /**
   * 获取 Item 的ID
   */
  getID: () => string;

  getShapeCfg: (model: ModelConfig) => ModelConfig;

  /**
   * 刷新一般用于处理几种情况
   * 1. item model 在外部被改变
   * 2. 边的节点位置发生改变，需要重新计算边
   *
   * 因为数据从外部被修改无法判断一些属性是否被修改，直接走位置和 shape 的更新
   */
  refresh: () => void;

  /**
   * 将更新应用到 model 上，刷新属性
   * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
   * @param  {Object} cfg       配置项，可以是增量信息
   * @param  {boolean} onlyMove 是否仅移动，只有 node 和 combo 可能是 true
   */
  update: (cfg: ModelConfig, onlyMove?: boolean) => void;

  /**
   * 更新元素内容，样式
   */
  updateShape: () => void;

  /**
   * 更新位置，避免整体重绘
   * @param {object} cfg 待更新数据
   */
  updatePosition: (cfg: Point) => boolean;

  /**
   * 绘制元素
   */
  draw: () => void;

  /**
   * 获取 item 的包围盒，这个包围盒是相对于 item 自己，不会将 matrix 计算在内
   */
  getBBox: () => IBBox;

  /**
   * 获取 item 相对于画布的包围盒，会将从顶层到当前元素的 matrix 都计算在内
   */
  getCanvasBBox: () => IBBox;

  /**
   * 将元素放到最前面
   */
  toFront: () => void;

  /**
   * 将元素放到最后面
   */
  toBack: () => void;

  /**
   * 显示元素
   */
  show: () => void;

  /**
   * 隐藏元素
   */
  hide: () => void;

  /**
   * 更改是否显示
   * @param  {Boolean} visible 是否显示
   */
  changeVisibility: (visible: boolean) => void;

  /**
   * 是否捕获及触发该元素的交互事件
   * @param {Boolean} enable 标识位
   */
  enableCapture: (enable: boolean) => void;

  isVisible: () => boolean;

  isOnlyMove: (cfg: ModelConfig) => boolean;

  get: <T = any>(key: string) => T;
  set: <T = any>(key: string, value: T) => void;

  destroy: () => void;
}

export interface IEdge extends IItemBase {
  setSource: (source: INode | ICombo) => void;
  setTarget: (target: INode | ICombo) => void;
  getSource: () => INode | ICombo;
  getTarget: () => INode | ICombo;
}

export interface INode extends IItemBase {
  /**
   * 获取从节点关联的所有边
   * @return {Array} 边的集合
   */
  getEdges: () => IEdge[];

  /**
   * 获取引入节点的边 target == this
   * @return {Array} 边的集合
   */
  getInEdges: () => IEdge[];

  /**
   * 获取从节点引出的边 source == this
   * @return {Array} 边的集合
   */
  getOutEdges: () => IEdge[];

  /**
   * 根据锚点的索引获取连接点
   * @param  {Number} index 索引
   * @return {Object} 连接点 {x,y}
   */
  getLinkPointByAnchor: (index: number) => IPoint;

  /**
   * 获取连接点
   * @param {Object} point 节点外面的一个点，用于计算交点、最近的锚点
   * @return {Object} 连接点 {x,y}
   */
  getLinkPoint: (point: IPoint) => IPoint | null;

  /**
   * 添加边
   * @param {Edge} edge 边
   */
  addEdge: (edge: IEdge) => void;

  /**
   * 移除边
   * @param {Edge} edge 边
   */
  removeEdge: (edge: IEdge) => void;

  /**
   * 获取锚点的定义
   * @return {array} anchorPoints， {x,y,...cfg}
   */
  getAnchorPoints: () => IPoint[] | number[][];

  hasLocked: () => boolean;

  lock: () => void;

  unlock: () => void;

  /**
   * 获取节点所有的邻居节点
   *
   * @returns {INode[]}
   * @memberof INode
   */
  getNeighbors: (type?: 'source' | 'target' | undefined) => INode[];
}

export interface ICombo extends INode {
  /**
   * 获取 Combo 中所有的子元素，包括 Combo、Node 及 Edge
   */
  getChildren: () => { nodes: INode[]; combos: ICombo[] };

  /**
   * 获取 Combo 中所有节点
   */
  getNodes: () => INode[];

  /**
   * 获取 Combo 中所有子 combo
   */
  getCombos: () => INode[];

  /**
   * 向 Combo 中增加 combo
   * @param item 节点或 combo 的 Item 实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addChild: (item: INode | ICombo) => boolean;

  /**
   * 向 Combo 中增加 combo
   * @param combo Combo 实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addCombo: (combo: ICombo) => boolean;

  /**
   * 向 Combo 中添加节点
   * @param node 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addNode: (node: string | INode) => boolean;

  /**
   * 从 Combo 中移除子元素
   * @param item Combo 或 Node 实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  removeChild: (item: ICombo | INode) => boolean;

  /**
   * 从 Combo 中移除指定的 combo
   * @param combo Combo 实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  removeCombo: (combo: ICombo) => boolean;

  /**
   * 向 Combo 中移除指定的节点
   * @param node 节点实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  removeNode: (node: INode) => boolean;
}
