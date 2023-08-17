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

export enum STACK_TYPE {
  'redo' = 'redo',
  'undo' = 'undo',
}

export type StackType = `${STACK_TYPE}`;
