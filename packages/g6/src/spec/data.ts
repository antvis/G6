import type { ID, State } from '../types';
import type { ComboStyle } from './element/combo';
import type { EdgeStyle } from './element/edge';
import type { NodeStyle } from './element/node';

export interface GraphData {
  /**
   * <zh/> 节点数据
   *
   * <en/> node data
   */
  nodes?: NodeData[];
  /**
   * <zh/> 边数据
   *
   * <en/> edge data
   */
  edges?: EdgeData[];
  /**
   * <zh/> Combo 数据
   *
   * <en/> combo data
   */
  combos?: ComboData[];
}

export interface NodeData {
  /**
   * <zh/> 节点 ID
   *
   * <en/> Node ID
   */
  id: ID;
  /**
   * <zh/> 节点类型
   *
   * <en/> Node type
   */
  type?: string;
  /**
   * <zh/> 节点数据
   *
   * <en/> Node data
   * @remarks
   * <zh/> 用于存储节点的自定义数据，可以在样式映射中通过回调函数获取
   *
   * <en/> Used to store custom data of the node, which can be obtained through callback functions in the style mapping
   */
  data?: Record<string, unknown>;
  /**
   * <zh/> 节点样式
   *
   * <en/> Node style
   */
  style?: NodeStyle;
  /**
   * <zh/> 节点初始状态
   *
   * <en/> Initial state of the node
   */
  states?: State[];
  /**
   * <zh/> 所属组合 ID
   *
   * <en/> ID of the combo to which the node belongs
   */
  combo?: ID;
  /**
   * <zh/> 子节点 ID
   *
   * <en/> Child node ID
   * @remarks
   * <zh/> 适用于树图结构
   *
   * <en/> Suitable for tree graph structure
   */
  children?: ID[];
  [key: string]: unknown;
}

export interface ComboData {
  /**
   * <zh/> Combo ID
   *
   * <en/> Combo ID
   */
  id: ID;
  /**
   * <zh/> Combo 类型
   *
   * <en/> Combo type
   */
  type?: string;
  /**
   * <zh/> Combo 数据
   *
   * <en/> Combo data
   * @remarks
   * <zh/> 用于存储 Combo 的自定义数据，可以在样式映射中通过回调函数获取
   *
   * <en/> Used to store custom data of the Combo, which can be obtained through callback functions in the style mapping
   */
  data?: Record<string, unknown>;
  /**
   * <zh/> Combo 样式
   *
   * <en/> Combo style
   */
  style?: ComboStyle;
  /**
   * <zh/> 组合初始状态
   *
   * <en/> Initial state of the combo
   */
  states?: State[];
  /**
   * <zh/> 所属组合 ID
   *
   * <en/> ID of the combo to which the combo belongs
   */
  combo?: ID;
  [key: string]: unknown;
}

export interface EdgeData {
  /**
   * <zh/> 边 ID
   *
   * <en/> Edge ID
   */
  id?: ID;
  /**
   * <zh/> 边源节点 ID
   *
   * <en/> Source node ID
   */
  source: ID;
  /**
   * <zh/> 边目标节点 ID
   *
   * <en/> Target node ID
   */
  target: ID;
  /**
   * <zh/> 边类型
   *
   * <en/> Edge type
   */
  type?: string;
  /**
   * <zh/> 边数据
   *
   * <en/> Edge data
   * @remarks
   * <zh/> 用于存储边的自定义数据，可以在样式映射中通过回调函数获取
   *
   * <en/> Used to store custom data of the edge, which can be obtained through callback functions in the style mapping
   */
  data?: Record<string, unknown>;
  /**
   * <zh/> 边样式
   *
   * <en/> Edge style
   */
  style?: EdgeStyle;
  /**
   * <zh/> 边初始状态
   *
   * <en/> Initial state of the edge
   */
  states?: State[];
  [key: string]: unknown;
}
