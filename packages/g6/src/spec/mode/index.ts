export type ModeOptions = (BuiltInBehavior | CustomBehavior)[];

// TODO import from built in behavior
declare type BuiltInBehavior =
  | 'activate-relations'
  | 'brush-select'
  | 'click-select'
  | 'collapse-expand-combo'
  | 'collapse-expand-tree'
  | 'create-edge'
  | 'drag-canvas'
  | 'drag-combo'
  | 'drag-node'
  | 'hover-activate'
  | 'lasso-select'
  | 'orbit-canvas-3d'
  | 'rotate-canvas-3d'
  | 'scroll-canvas'
  | 'shortcuts-call'
  | 'track-canvas-3d'
  | 'zoom-canvas-3d'
  | 'zoom-canvas';

type CustomBehavior = string;
