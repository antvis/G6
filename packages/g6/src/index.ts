import './preset';

export const version = '5.0.0';

export { BaseBehavior } from './behaviors';
export { CanvasEvent, ComboEvent, CommonEvent, ContainerEvent, EdgeEvent, GraphEvent, NodeEvent } from './constants';
export { getExtension, getExtensions, register } from './registry';
export { Graph } from './runtime/graph';
export { treeToGraphData } from './utils/tree';

export type { BaseBehaviorOptions } from './behaviors';
export type * from './spec';
