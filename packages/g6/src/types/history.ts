export type StackCfg = {
  stackSize?: number;
  ignoreAdd?: boolean;
  ignoreRemove?: boolean;
  ignoreUpdate?: boolean;
  ignoreStateChange?: boolean;
  ignoreLayerChange?: boolean;
  ignoreDisplayChange?: boolean;
  includes?: string[];
  excludes?: string[];
};

export enum HISTORY_OPERATION_TYPE {
  'redo' = 'redo',
  'undo' = 'undo',
}

export type HistoryOperationType = `${HISTORY_OPERATION_TYPE}`;
