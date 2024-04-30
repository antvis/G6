export const ChangeEvent = {
  /**
   * <zh/> 数据变更
   *
   * <en/> Data changes
   */
  CHANGE: 'change',
};

export const enum ChangeType {
  /**
   * <zh/> 节点添加
   *
   * <en/> Node added
   */
  'NodeAdded' = 'NodeAdded',
  /**
   * <zh/> 节点更新
   *
   * <en/> Node updated
   */
  'NodeUpdated' = 'NodeUpdated',
  /**
   * <zh/> 节点删除
   *
   * <en/> Node removed
   */
  'NodeRemoved' = 'NodeRemoved',
  /**
   * <zh/> 边添加
   *
   * <en/> Edge added
   */
  'EdgeAdded' = 'EdgeAdded',
  /**
   * <zh/> 边更新
   *
   * <en/> Edge updated
   */
  'EdgeUpdated' = 'EdgeUpdated',
  /**
   * <zh/> 边删除
   *
   * <en/> Edge removed
   */
  'EdgeRemoved' = 'EdgeRemoved',
  /**
   * <zh/> Combo添加
   *
   * <en/> Combo added
   */
  'ComboAdded' = 'ComboAdded',
  /**
   * <zh/> Combo更新
   *
   * <en/> Combo updated
   */
  'ComboUpdated' = 'ComboUpdated',
  /**
   * <zh/> Combo删除
   *
   * <en/> Combo removed
   */
  'ComboRemoved' = 'ComboRemoved',
}
