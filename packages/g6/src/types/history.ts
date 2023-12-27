export type StackCfg = {
  /** A number representing the size of the stack. */
  stackSize?: number;
  /** Indicate whether the stack is active. If active, operations can be pushed onto the stack; otherwise, cannot. */
  stackActive?: boolean;
  /**
   * Allows finer-grained control over the ignore option.
   * If an API is in excludes, even if its operation type is not ignored, it will not be put on the stack
   */
  excludes?: string[];
  includes?: string[];
  /** ignore* is a global setting that indicates whether to ignore a certain type of operation */
  ignoreAdd?: boolean;
  /** A boolean indicating whether to ignore remove operations. */
  ignoreRemove?: boolean;
  /** A boolean indicating whether to ignore update operations. */
  ignoreUpdate?: boolean;
  /** A boolean indicating whether to ignore state change operations.*/
  ignoreStateChange?: boolean;
  /** A boolean indicating whether to ignore layer change operations. */
  ignoreLayerChange?: boolean;
  /** A boolean indicating whether to ignore display change operations. */
  ignoreDisplayChange?: boolean;
};

export enum STACK_TYPE {
  'redo' = 'redo',
  'undo' = 'undo',
}

export type StackType = `${STACK_TYPE}`;
