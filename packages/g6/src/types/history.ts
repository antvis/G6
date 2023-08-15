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
