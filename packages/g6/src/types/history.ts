import type { GraphData } from '../spec';

/**
 * <zh/> 单条历史记录命令
 *
 * <en/> Single history record command
 */
export interface Command {
  /**
   * <zh/> 当前数据
   *
   * <en/> Current data
   */
  current: CommandData;
  /**
   * <zh/> 原始数据
   *
   * <en/> Original data
   */
  original: CommandData;
  /**
   * <zh/> 是否开启动画
   *
   * <en/> Whether to enable animation
   */
  animation: boolean;
}

/**
 * <zh/> 单条历史记录命令数据
 *
 * <en/> Single history record command data
 */
export interface CommandData {
  /**
   * <zh/> 新增的数据
   *
   * <en/> Added data
   */
  add: GraphData;
  /**
   * <zh/> 更新的数据
   *
   * <en/> Updated data
   */
  update: GraphData;
  /**
   * <zh/> 移除的数据
   *
   * <en/> Removed data
   */
  remove: GraphData;
}
