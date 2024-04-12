export const ChangeEvent = {
  /** <zh/> 数据变更 | <en/> 数据变更 */
  CHANGE: 'change',
};

export const enum ChangeType {
  'NodeAdded' = 'NodeAdded',
  'NodeUpdated' = 'NodeUpdated',
  'NodeRemoved' = 'NodeRemoved',
  'EdgeAdded' = 'EdgeAdded',
  'EdgeUpdated' = 'EdgeUpdated',
  'EdgeRemoved' = 'EdgeRemoved',
  'ComboAdded' = 'ComboAdded',
  'ComboUpdated' = 'ComboUpdated',
  'ComboRemoved' = 'ComboRemoved',
}
