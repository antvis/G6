import { EdgeConfig, GraphData, IPointTuple, NodeConfig } from '../types';

/**
 * 布局
 */
export interface ILayout<Cfg = any> {
  /** 节点 */
  nodes: NodeConfig[];
  /** 边 */
  edges: EdgeConfig[];
  /** 布局获得的位置 */
  positions: IPointTuple[];
  /** 是否已销毁 */
  destroyed: boolean;

  /**
   * 定义自定义行为的默认参数，会与用户传入的参数进行合并
   */
  getDefaultCfg(): void;
  /**
   * 初始化
   * @param {object} data 数据
   */
  init(data: GraphData): void;
  /**
   * 执行布局
   */
  execute(): void;
  /**
   * 根据传入的数据进行布局
   * @param {object} data 数据
   */
  layout(data: GraphData): void;
  /**
   * 更新布局配置，但不执行布局
   * @param {object} cfg 需要更新的配置项
   */
  updateCfg(cfg: Partial<Cfg>): void;
  /**
   * 销毁
   */
  destroy(): void;
}
